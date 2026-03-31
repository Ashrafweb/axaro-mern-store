import { Queue, Worker, QueueEvents } from "bullmq";
import IORedis from "ioredis";
import EmailService from "../email/emailService.js";
import {
  orderConfirmationHtml,
  orderConfirmationText,
} from "../email/templates.js";

// ─── Redis connection ────────────────────────────────────────────────────────
// If Redis is not available the queues are simply disabled; the rest of the
// application continues to function normally (emails are then skipped).

let connection = null;
let emailQueue = null;
let orderQueue = null;

function createRedisConnection() {
  const conn = new IORedis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    lazyConnect: true,
  });

  conn.on("error", () => {
    // Swallow connection errors – queues are best-effort.
  });

  return conn;
}

function getConnection() {
  if (!connection) {
    connection = createRedisConnection();
  }
  return connection;
}

// ─── Queue names ─────────────────────────────────────────────────────────────
export const EMAIL_QUEUE = "email";
export const ORDER_QUEUE = "order";

// ─── Queue factories ──────────────────────────────────────────────────────────

/**
 * Return (and lazily create) the email BullMQ Queue instance.
 * Returns null when Redis is unavailable.
 */
export function getEmailQueue() {
  if (!emailQueue) {
    try {
      emailQueue = new Queue(EMAIL_QUEUE, {
        connection: getConnection(),
        defaultJobOptions: {
          attempts: 3,
          backoff: { type: "exponential", delay: 5000 },
          removeOnComplete: true,
          removeOnFail: 100,
        },
      });
    } catch {
      return null;
    }
  }
  return emailQueue;
}

/**
 * Return (and lazily create) the order BullMQ Queue instance.
 * Returns null when Redis is unavailable.
 */
export function getOrderQueue() {
  if (!orderQueue) {
    try {
      orderQueue = new Queue(ORDER_QUEUE, {
        connection: getConnection(),
        defaultJobOptions: {
          attempts: 3,
          backoff: { type: "exponential", delay: 3000 },
          removeOnComplete: true,
          removeOnFail: 100,
        },
      });
    } catch {
      return null;
    }
  }
  return orderQueue;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Enqueue an order-confirmation email job.
 * Fails silently when BullMQ / Redis is unavailable.
 * @param {object} order  Populated Order document
 */
export async function enqueueOrderConfirmationEmail(order) {
  try {
    const queue = getEmailQueue();
    if (!queue) return;
    await queue.add("order-confirmation", {
      orderId: order._id.toString(),
      to: order.user?.email,
      order: {
        _id: order._id,
        user: { username: order.user?.username },
        orderItems: order.orderItems,
        shippingAddress: order.shippingAddress,
        itemsPrice: order.itemsPrice,
        shippingPrice: order.shippingPrice,
        taxPrice: order.taxPrice,
        totalPrice: order.totalPrice,
      },
    });
  } catch {
    // Non-critical – log and move on
    console.warn("[Queue] Failed to enqueue order confirmation email");
  }
}

// ─── Workers ─────────────────────────────────────────────────────────────────

let emailWorker = null;
let orderWorker = null;

/**
 * Start the email worker that processes jobs from the email queue.
 * Returns null when Redis is unavailable.
 */
export function startEmailWorker() {
  if (emailWorker) return emailWorker;

  try {
    const emailSvc = EmailService.getInstance();

    emailWorker = new Worker(
      EMAIL_QUEUE,
      async (job) => {
        if (job.name === "order-confirmation") {
          const { to, order } = job.data;
          if (!to) {
            console.warn(
              `[EmailWorker] No recipient for order ${order._id}, skipping`
            );
            return;
          }
          await emailSvc.sendMail({
            to,
            subject: `Axaro – Order Confirmed #${order._id}`,
            text: orderConfirmationText(order),
            html: orderConfirmationHtml(order),
          });
          console.log(`[EmailWorker] Confirmation email sent to ${to}`);
        }
      },
      { connection: getConnection() }
    );

    emailWorker.on("failed", (job, err) => {
      console.error(`[EmailWorker] Job ${job?.id} failed:`, err.message);
    });

    console.log("[Queue] Email worker started");
    return emailWorker;
  } catch {
    console.warn("[Queue] Could not start email worker (Redis unavailable?)");
    return null;
  }
}

/**
 * Start the order worker that handles post-payment order processing.
 * Returns null when Redis is unavailable.
 */
export function startOrderWorker() {
  if (orderWorker) return orderWorker;

  try {
    orderWorker = new Worker(
      ORDER_QUEUE,
      async (job) => {
        if (job.name === "post-payment") {
          // Placeholder for additional post-payment processing
          // e.g. inventory reservation, fraud checks, analytics events
          console.log(
            `[OrderWorker] Processing post-payment job for order ${job.data.orderId}`
          );
        }
      },
      { connection: getConnection() }
    );

    orderWorker.on("failed", (job, err) => {
      console.error(`[OrderWorker] Job ${job?.id} failed:`, err.message);
    });

    console.log("[Queue] Order worker started");
    return orderWorker;
  } catch {
    console.warn("[Queue] Could not start order worker (Redis unavailable?)");
    return null;
  }
}

/**
 * Start all workers.  Safe to call multiple times.
 */
export function startWorkers() {
  startEmailWorker();
  startOrderWorker();
}

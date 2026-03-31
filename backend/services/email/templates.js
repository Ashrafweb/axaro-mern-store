/**
 * Email templates for transactional messages.
 */

/**
 * Build the HTML body for an order-confirmation email.
 * @param {object} order  Mongoose Order document (plain object or Mongoose doc)
 * @returns {string} HTML string
 */
export function orderConfirmationHtml(order) {
  const rows = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${item.name}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${item.qty}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">$${Number(item.price).toFixed(2)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">$${(item.qty * item.price).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;">
  <div style="background:#e91e63;padding:24px;text-align:center;">
    <h1 style="color:#fff;margin:0;">Order Confirmed 🎉</h1>
  </div>
  <div style="padding:24px;">
    <p>Hi <strong>${order.user?.username || "Valued Customer"}</strong>,</p>
    <p>Thank you for your purchase! Your order has been received and is being processed.</p>

    <h3>Order ID: <span style="color:#e91e63;">${order._id}</span></h3>

    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:16px;">
      <thead>
        <tr style="background:#f5f5f5;">
          <th style="padding:10px;text-align:left;">Product</th>
          <th style="padding:10px;text-align:center;">Qty</th>
          <th style="padding:10px;text-align:right;">Price</th>
          <th style="padding:10px;text-align:right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>

    <table width="100%" style="margin-top:16px;">
      <tr>
        <td>Items</td>
        <td align="right">$${Number(order.itemsPrice).toFixed(2)}</td>
      </tr>
      <tr>
        <td>Shipping</td>
        <td align="right">$${Number(order.shippingPrice).toFixed(2)}</td>
      </tr>
      <tr>
        <td>Tax</td>
        <td align="right">$${Number(order.taxPrice).toFixed(2)}</td>
      </tr>
      <tr style="font-weight:bold;font-size:1.1em;">
        <td>Total</td>
        <td align="right">$${Number(order.totalPrice).toFixed(2)}</td>
      </tr>
    </table>

    <h3 style="margin-top:24px;">Shipping Address</h3>
    <p>
      ${order.shippingAddress.address},<br/>
      ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br/>
      ${order.shippingAddress.country}
    </p>

    <p style="margin-top:32px;color:#777;">
      If you have any questions, reply to this email or contact our support team.
    </p>
    <p style="color:#777;">— The Axaro Team</p>
  </div>
</body>
</html>`;
}

/**
 * Build the plain-text body for an order-confirmation email.
 * @param {object} order
 * @returns {string}
 */
export function orderConfirmationText(order) {
  const items = order.orderItems
    .map((i) => `  - ${i.name} x${i.qty}  $${(i.qty * i.price).toFixed(2)}`)
    .join("\n");

  return `
Order Confirmed!

Hi ${order.user?.username || "Valued Customer"},

Thank you for your purchase. Your order has been received.

Order ID: ${order._id}

Items:
${items}

Items Price:  $${Number(order.itemsPrice).toFixed(2)}
Shipping:     $${Number(order.shippingPrice).toFixed(2)}
Tax:          $${Number(order.taxPrice).toFixed(2)}
Total:        $${Number(order.totalPrice).toFixed(2)}

Shipping to:
${order.shippingAddress.address}
${order.shippingAddress.city}, ${order.shippingAddress.postalCode}
${order.shippingAddress.country}

Thank you for shopping with Axaro!
`.trim();
}

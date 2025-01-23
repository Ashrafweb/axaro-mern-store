import { rateLimit } from 'express-rate-limit'

const rateLimitMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // Limit each IP to 100 requests per windowMs
});

export default rateLimitMiddleware;
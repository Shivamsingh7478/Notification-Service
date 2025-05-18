const { z } = require('zod');

const notificationSchema = z.object({
  type: z.enum(['email', 'sms', 'in-app']),
  userId: z.string(),
  recipient: z.string().optional(), 
  subject: z.string().optional(),
  message: z.string().min(1),
  emailAuth: z
    .object({
      user: z.string().email(),
      pass: z.string(),
    })
    .optional(),
});

const userIdSchema = z.object({
  id: z.string(),
});

module.exports = {
  notificationSchema,
  userIdSchema,
};

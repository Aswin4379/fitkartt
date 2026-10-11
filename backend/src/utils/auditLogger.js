import AuditLog from '../models/AuditLog.js';

/**
 * Sanitizes metadata to strictly exclude passwords, tokens, OTPs, API keys, or raw payment cards.
 */
function sanitizeMetadata(metadata = {}) {
  if (!metadata || typeof metadata !== 'object') return {};
  const sanitized = { ...metadata };
  const sensitiveKeys = ['password', 'token', 'resetToken', 'otp', 'apiKey', 'card', 'cvv', 'pan', 'secret'];

  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some(s => key.toLowerCase().includes(s))) {
      delete sanitized[key];
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeMetadata(sanitized[key]);
    }
  }
  return sanitized;
}

/**
 * Logs a business audit event to MongoDB asynchronously.
 * Never throws an uncaught error to break the primary request pipeline.
 */
export const logAuditEvent = async ({
  userId,
  userEmail = '',
  action,
  entityType,
  entityId = '',
  metadata = {},
  req = null
}) => {
  try {
    if (!userId) return null;

    let ipAddress = '';
    let userAgent = '';

    if (req) {
      ipAddress = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.ip || '';
      userAgent = req.headers['user-agent'] || '';
      if (!userEmail && req.user?.email) {
        userEmail = req.user.email;
      }
    }

    const log = await AuditLog.create({
      user: userId,
      userEmail,
      action,
      entityType,
      entityId: String(entityId),
      metadata: sanitizeMetadata(metadata),
      ipAddress: String(ipAddress).slice(0, 45),
      userAgent: String(userAgent).slice(0, 255),
      createdAt: new Date()
    });

    return log;
  } catch (error) {
    console.error('[AuditLog Error]: Failed to persist audit log entry:', error.message);
    return null;
  }
};

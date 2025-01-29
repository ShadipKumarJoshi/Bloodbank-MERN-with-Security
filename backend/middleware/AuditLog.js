const AuditLog = require("../model/auditModel");

function logAction(
  action,
  user,
  previousData = null,
  newData = null,
  route = "",
  req = null
) {
  const log = new AuditLog({
    user,
    action,
    previousData,
    newData,
    route,
    ipAddress: req ? req.ip : "", // Extract IP address from request if available
    userAgent: req ? req.headers["user-agent"] : "", // Extract User-Agent from request if available
  });

  return log.save();
}

module.exports = logAction;

const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  action: { type: String, required: true },
  previousData: { type: Object, required: false }, 
  newData: { type: Object, required: false }, 
  timestamp: { type: Date, default: Date.now },
  route: { type: String, required: true },
  ipAddress: { type: String, required: false }, 
  userAgent: { type: String, required: false }, 
});

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

module.exports = AuditLog;

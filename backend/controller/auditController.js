const AuditLog = require("../model/auditModel");

const getAllLogs = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const logs = await AuditLog.find()
      .populate("user")
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalLogs = await AuditLog.countDocuments();

    res.status(200).json({
      totalPages: Math.ceil(totalLogs / limit),
      currentPage: parseInt(page),
      totalLogs,
      logs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllLogs };

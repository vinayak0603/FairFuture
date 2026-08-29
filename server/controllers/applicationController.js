import Application from "../models/Application.js";

// @desc    Submit new consultation application
// @route   POST /api/applications
// @access  Public
export const createApplication = async (req, res, next) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applications with search, filter, pagination, sorting
// @route   GET /api/applications
// @access  Protected (Admin)
export const getApplications = async (req, res, next) => {
  try {
    const {
      search,
      status,
      country,
      program,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const query = {};

    // Filter by Status
    if (status && status !== "All") {
      query.status = status;
    }

    // Filter by Country
    if (country && country !== "All") {
      query.destCountries = { $in: [country] };
    }

    // Filter by Program
    if (program && program !== "All") {
      query.program = program;
    }

    // Search keyword in name, email, phone, city
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { city: searchRegex },
        { state: searchRegex },
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const [applications, total] = await Promise.all([
      Application.find(query).sort(sort).skip(skip).limit(limitNum),
      Application.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: applications.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single application detail
// @route   GET /api/applications/:id
// @access  Protected (Admin)
export const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status
// @route   PATCH /api/applications/:id/status
// @access  Protected (Admin)
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "Contacted", "In Review", "Approved", "Closed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.status(200).json({
      success: true,
      message: `Status updated to ${status}`,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add admin note to application
// @route   POST /api/applications/:id/notes
// @access  Protected (Admin)
export const addAdminNote = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: "Note text cannot be empty" });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    application.adminNotes.push({
      text: text.trim(),
      author: req.admin?.name || "Admin",
    });

    await application.save();

    res.status(200).json({
      success: true,
      message: "Note added successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete application lead
// @route   DELETE /api/applications/:id
// @access  Protected (Admin)
export const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    res.status(200).json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard analytics / statistics overview
// @route   GET /api/applications/analytics/overview
// @access  Protected (Admin)
export const getAnalytics = async (req, res, next) => {
  try {
    const totalApplications = await Application.countDocuments();
    const pendingCount = await Application.countDocuments({ status: "Pending" });
    const contactedCount = await Application.countDocuments({ status: "Contacted" });
    const approvedCount = await Application.countDocuments({ status: "Approved" });

    // Aggregate by destination countries
    const countryStats = await Application.aggregate([
      { $unwind: "$destCountries" },
      { $group: { _id: "$destCountries", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Aggregate by program level
    const programStats = await Application.aggregate([
      { $group: { _id: "$program", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Status breakdown
    const statusStats = await Application.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalApplications,
        pendingCount,
        contactedCount,
        approvedCount,
        countryStats,
        programStats,
        statusStats,
      },
    });
  } catch (error) {
    next(error);
  }
};

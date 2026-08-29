import mongoose from "mongoose";

const adminNoteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    author: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

const applicationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    destCountries: {
      type: [String],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one destination country must be selected",
      },
    },
    program: {
      type: String,
      required: [true, "Program level is required"],
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: [true, "Field of study is required"],
      trim: true,
    },
    currentEducation: {
      type: String,
      required: [true, "Highest qualification is required"],
      trim: true,
    },
    yearOfPassout: {
      type: String,
      required: [true, "Passout year is required"],
      trim: true,
    },
    budget: {
      type: String,
      required: [true, "Annual budget preference is required"],
      trim: true,
    },
    timeline: {
      type: String,
      required: [true, "Target intake timeline is required"],
      trim: true,
    },
    hasPassport: {
      type: String,
      default: "In Process",
      trim: true,
    },
    needsScholarship: {
      type: String,
      default: "Not Sure",
      trim: true,
    },
    hearFrom: {
      type: String,
      default: "Other",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Contacted", "In Review", "Approved", "Closed"],
      default: "Pending",
    },
    adminNotes: [adminNoteSchema],
  },
  {
    timestamps: true,
  }
);

// Search Index on name, email, phone, city
applicationSchema.index({ firstName: "text", lastName: "text", email: "text", phone: "text", city: "text" });

const Application = mongoose.model("Application", applicationSchema);
export default Application;

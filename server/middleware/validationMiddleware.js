import { body, validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    return res.status(400).json({
      success: false,
      message: formattedErrors[0]?.message || "Validation failed",
      errors: formattedErrors,
    });
  }
  next();
};

export const validateApplication = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").trim().isEmail().withMessage("Please enter a valid email address").normalizeEmail(),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("city").trim().notEmpty().withMessage("City is required"),
  body("state").trim().notEmpty().withMessage("State is required"),
  body("destCountries")
    .isArray({ min: 1 })
    .withMessage("Select at least one preferred destination country"),
  body("program").trim().notEmpty().withMessage("Program level is required"),
  body("fieldOfStudy").trim().notEmpty().withMessage("Field of study is required"),
  body("currentEducation").trim().notEmpty().withMessage("Highest qualification is required"),
  body("yearOfPassout").trim().notEmpty().withMessage("Passout year is required"),
  body("budget").trim().notEmpty().withMessage("Annual budget is required"),
  body("timeline").trim().notEmpty().withMessage("Intake timeline is required"),
  handleValidationErrors,
];

export const validateAdminLogin = [
  body("email").trim().isEmail().withMessage("Valid admin email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

const mongoose = require("mongoose");

const CourseTypeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    courses: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseType", CourseTypeSchema);

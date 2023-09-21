const router = require("express").Router();
const CourseType = require("../models/CourseType");
const verify = require("../middlewares/verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newCourseType = new CourseType(req.body);
    try {
      const savedCourseType = await newCourseType.save();
      res.status(200).json(savedCourseType);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to create a course type");
  }
});

//GET ONE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const courseType = await CourseType.findById(req.params.id);
    res.status(200).json(courseType);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const courseTypes = query
      ? await CourseType.find().sort({ _id: -1 }).limit(10)
      : await CourseType.find();
    res.status(200).json(courseTypes);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedCourseType = await CourseType.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedCourseType);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update this course type!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await CourseType.findByIdAndDelete(req.params.id);
      res.status(200).json("Course Type has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;
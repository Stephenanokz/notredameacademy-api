const router = require("express").Router();
const Course = require("../models/Course");
const verify = require("../middlewares/verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newCourse = new Course(req.body);
    try {
      const savedCourse = await newCourse.save();
      res.status(200).json(savedCourse);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to create a course");
  }
});

//GET ONE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const courses = query
      ? await Course.find().sort({ _id: -1 }).limit(10)
      : await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedCourse);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update this course!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Course.findByIdAndDelete(req.params.id);
      res.status(200).json("Course has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;
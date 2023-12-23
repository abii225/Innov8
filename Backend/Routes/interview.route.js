const express = require("express");
const router = express.Router();

//* Auth Controller
const interviewController = require("../Controller/interview.controller");

// /interview/start (POST to initiate a new interview)
router.post("/interview/start", interviewController.startInterview);

//answer route
router.patch("/interview", interviewController.updateInterview);

// /interview/:id/end (POST to end an ongoing interview)
// router.post(
//   "/interview/end/:id",
//   video.single("videoPath"),
//   interviewController.endInterview
// );

// /interview/:id (GET to retrieve details of a specific interview)
router.get("/interview/:id", interviewController.getInterview);

module.exports = router;

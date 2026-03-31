import express from "express";
const router = express.Router();
import passport from "passport";
import upload from "../utils/multer.js";

import {
  facultyLogin,
  getAllSubjects,
  updateProfile,
  updatePassword,
  fetchStudents,
  markAttendance,
  forgotPassword,
  postOTP,
  uploadMarks,
} from "../controllers/facultyController.js";

//Auth and Profile
router.post("/login", facultyLogin);
router.post("/forgotPassword", forgotPassword);
router.post("/postOTP", postOTP);
router.put(
  "/updateProfile",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);
router.post(
  "/updatePassword",
  passport.authenticate("jwt", { session: false }),
  updatePassword
);

//Utility
router.post(
  "/fetchStudents",
  passport.authenticate("jwt", { session: false }),
  fetchStudents
);
router.post(
  "/fetchAllSubjects",
  passport.authenticate("jwt", { session: false }),
  getAllSubjects
);
router.post(
  "/markAttendance",
  passport.authenticate("jwt", { session: false }),
  markAttendance
);
router.post(
  "/uploadMarks",
  passport.authenticate("jwt", { session: false }),
  uploadMarks
);

export default router;

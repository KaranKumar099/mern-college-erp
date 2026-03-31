import express from "express";
const router = express.Router();
import passport from "passport";

import {
  adminLogin,
  addFaculty,
  addStudent,
  addSubject,
  addAdmin,
  getAllFaculty,
  getAllStudents,
  getAllSubjects,
  getFaculty,
  getStudents,
  getSubjects,
} from "../controllers/adminController.js";

router.post("/login", adminLogin);
router.post("/addAdmin", addAdmin);
router.post(
  "/addFaculty",
  passport.authenticate("jwt", { session: false }),
  addFaculty
);
router.post(
  "/addStudent",
  passport.authenticate("jwt", { session: false }),
  addStudent
);
router.post(
  "/addSubject",
  passport.authenticate("jwt", { session: false }),
  addSubject
);
router.post(
  "/getAllFaculty",
  passport.authenticate("jwt", { session: false }),
  getAllFaculty
);
router.post(
  "/getAllStudent",
  passport.authenticate("jwt", { session: false }),
  getAllStudents
);
router.post(
  "/getAllSubject",
  passport.authenticate("jwt", { session: false }),
  getAllSubjects
);
router.post(
  "/getFaculties",
  passport.authenticate("jwt", { session: false }),
  getFaculty
);
router.post(
  "/getStudents",
  passport.authenticate("jwt", { session: false }),
  getStudents
);
router.post(
  "/getSubjects",
  passport.authenticate("jwt", { session: false }),
  getSubjects
);

export default router;

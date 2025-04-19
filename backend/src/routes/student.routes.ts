import express from "express";
import {
  AllStudents,
  CreateStudent,
  DeleteStudent,
  Student,
  UpdateStudent,
} from "../student/controller/student.controller";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/student/create", verifyToken, isAdmin, CreateStudent);
  router.get("/student/all", verifyToken, isAdmin, AllStudents);
  router.get("/student/:id", verifyToken, isAdmin, Student);
  router.put("/student/update", verifyToken, isAdmin, UpdateStudent);
  router.delete("/student/delete/:id", verifyToken, isAdmin, DeleteStudent);
};

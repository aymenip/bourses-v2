import express from "express";
import {
  AllTeachers,
  CreateTeacher,
  DeleteTeacher,
  Teacher,
  UpdateTeacher,
} from "../teacher/controller/teacher.controller";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/teacher/create", verifyToken, isAdmin, CreateTeacher);
  router.get("/teacher/all", verifyToken, isAdmin, AllTeachers);
  router.get("/teacher/:id", verifyToken, isAdmin, Teacher);
  router.put("/teacher/update", verifyToken, isAdmin, UpdateTeacher);
  router.delete("/teacher/delete/:id", verifyToken, isAdmin, DeleteTeacher);
};

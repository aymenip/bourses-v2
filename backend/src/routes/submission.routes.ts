import express from "express";
import {
  CreateSubmission,
  DeleteSubmission,
  GetAllSubmissions,
  GetAllSubmissionsForUser,
  UpdateSubmission,
} from "../submission/controller/submission.controller";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/submission/create", verifyToken, CreateSubmission);
  router.put("/submission/update", verifyToken, UpdateSubmission);
  router.get("/submission/user", verifyToken, GetAllSubmissionsForUser);
  router.delete("/submission/:id", verifyToken, DeleteSubmission);
  router.get("/submission/all", verifyToken, isAdmin, GetAllSubmissions);
};

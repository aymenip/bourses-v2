import express from "express";
import {
  CreateConference,
  DeleteConference,
  GetAllConferences,
  GetAllConferencesForUser,
  UpdateConference,
} from "../conference/controller/conference.controller";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/conference/create", verifyToken, CreateConference);
  router.put("/conference/update", verifyToken, UpdateConference);
  router.get("/conference/user", verifyToken, GetAllConferencesForUser);
  router.delete("/conference/:id", verifyToken, DeleteConference);
  router.get("/conference/all", verifyToken, isAdmin, GetAllConferences);
};

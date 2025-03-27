import express from "express";
import {
  CreateThesis,
  GetAllTheses,
  GetAllThesesForUser,
  UpdateThesis,
} from "../thesis/controller/thesis.controller";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/thesis/create", verifyToken, CreateThesis);
  router.put("/thesis/update", verifyToken, UpdateThesis);
  router.get("/thesis/user", verifyToken, GetAllThesesForUser);
  router.get("/thesis/all", verifyToken, isAdmin, GetAllTheses);
};

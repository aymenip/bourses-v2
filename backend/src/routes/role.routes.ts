import express from "express";
import { CreateRole, GetAllRoles } from "../role/controller/role.controller";
import { verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/role/create", verifyToken, CreateRole);
  router.get("/role/all", verifyToken, GetAllRoles);
};

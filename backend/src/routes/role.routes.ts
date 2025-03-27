import express from "express";
import { CreateRole, GetAllRoles } from "../role/controller/role.controller";

export default (router: express.Router) => {
  router.post("/role/create", CreateRole);
  router.get("/role/all", GetAllRoles);
};

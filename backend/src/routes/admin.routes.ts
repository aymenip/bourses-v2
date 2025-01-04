import express from "express";
import {
  Admin,
  AllAdmins,
  CreateAdmin,
  UpdateAdmin,
  DeleteAdmin,
} from "../admin/controller/admin.controller";
import { verifyAdminKey } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/admin/create", verifyAdminKey, CreateAdmin);
  router.get("/admin", verifyAdminKey, Admin);
  router.get("/admin/all", verifyAdminKey, AllAdmins);
  router.put("/admin/update/", verifyAdminKey, UpdateAdmin);
  router.delete("/admin/delete/", verifyAdminKey, DeleteAdmin);
};

import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import {
  AllForms,
  CreateForm,
  DeleteForm,
  GetForm,
  UpdateForm,
} from "../form/controller/form.controller";

export default (router: express.Router) => {
  router.get("/form/all", verifyToken, AllForms);
  router.get("/form/:id", verifyToken, GetForm);
  router.post("/form/create", verifyToken, CreateForm);
  router.post("/form/update", verifyToken, UpdateForm);
  router.delete("/form/:id", verifyToken, DeleteForm);
};

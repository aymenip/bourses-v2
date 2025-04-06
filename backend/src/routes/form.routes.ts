import express from "express";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware";
import {
  AllForms,
  CreateForm,
  DeleteForm,
  GetForm,
  GetFormsForUser,
  UpdateForm,
} from "../form/controller/form.controller";
import { ChangeFormAccess } from "../form/controller/form.access.controller";

export default (router: express.Router) => {
  router.get("/form/all", verifyToken, AllForms);
  router.get("/form/:id", verifyToken, GetForm);
  router.post("/form/create", verifyToken, CreateForm);
  router.post("/form/update", verifyToken, UpdateForm);
  router.delete("/form/:id", verifyToken, DeleteForm);

  // formsaccess
  router.post("/form/access/change", verifyToken, isAdmin, ChangeFormAccess);


  router.get("/form/user/:positionId", verifyToken, GetFormsForUser);
};

import express from "express";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware";
import {
  CreateField,
  UpdateField,
  DelteField,
} from "../field/controller/field.controller";
import {
  CreateTypedField,
  DeleteTypedField,
  UpdateTypedField,
} from "../field/controller/typedField.controller";
import {
  CreateSourceableField,
  DeleteSourceableField,
  UpdateSourceableField,
} from "../field/controller/sourceableField.controller";

export default (router: express.Router) => {
  router.post("/field/create", verifyToken, isAdmin, CreateField);
  router.post("/field/update", verifyToken, isAdmin, UpdateField);
  router.delete("/field/:id", verifyToken, isAdmin, DelteField);
  // typedFields
  router.post("/field/typed/create", verifyToken, isAdmin, CreateTypedField);
  router.post("/field/typed/update", verifyToken, isAdmin, UpdateTypedField);
  router.delete("/field/typed/:id", verifyToken, isAdmin, DeleteTypedField);
  // sourceablFields
  router.post(
    "/field/sourceable/create",
    verifyToken,
    isAdmin,
    CreateSourceableField
  );
  router.post(
    "/field/sourceable/update",
    verifyToken,
    isAdmin,
    UpdateSourceableField
  );
  router.delete(
    "/field/sourceable/:id",
    verifyToken,
    isAdmin,
    DeleteSourceableField
  );
};

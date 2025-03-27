import express from "express";
import teacher from "./teacher.routes";
import position from "./position.routes";
import user from "./user.routes";
import role from "./role.routes";
import form from "./form.routes";
import field from "./field.routes";
import admin from "./admin.routes";
import thesis from "./thesis.routes";
import document from "./document.routes";
const router = express.Router();

export default (): express.Router => {
  admin(router);
  user(router);
  teacher(router);
  position(router);
  role(router);
  form(router);
  field(router);
  document(router);
  thesis(router);
  return router;
};

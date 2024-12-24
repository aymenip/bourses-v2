import express from "express";
import teacher from "./teacher.routes";
import position from "./position.routes"
import user from "./user.routes";
import role from "./role.routes";
import form from "./form.routes";
import field from "./field.routes";
const router = express.Router();

export default (): express.Router => {

    teacher(router);
    position(router);
    user(router);
    role(router);
    form(router);
    field(router);
    return router
}
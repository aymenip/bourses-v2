import express from "express";
import teacher from "./teacher.routes";
import position from "./position.routes"
import user from "./user.routes";
const router = express.Router();

export default (): express.Router => {

    teacher(router);
    position(router);
    user(router);

    return router
}
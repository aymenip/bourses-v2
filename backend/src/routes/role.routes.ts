import express from "express";
import { CreateRole } from "../role/controller/role.controller";



export default (router: express.Router) => {
    router.post("/role/create", CreateRole);
}
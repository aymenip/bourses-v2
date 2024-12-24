import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { CreateForm, UpdateForm } from "../form/controller/form.controller";



export default (router: express.Router) => {
    router.post("/form/create", verifyToken, CreateForm);
    router.post("/form/update", verifyToken, UpdateForm);
}
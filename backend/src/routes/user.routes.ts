import express from "express";
import { Login, Register, Me, UpdateMe } from "../user/controller/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";



export default (router: express.Router) => {
    router.get("/user/me", verifyToken, Me);
    router.post("/user/login", Login);
    router.post("/user/register", Register);
    router.put("/user/me/update/", verifyToken, UpdateMe)
}
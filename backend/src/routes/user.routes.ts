import express from "express";
import {
  Login,
  Register,
  Me,
  UpdateMe,
  GrantAccess,
} from "../user/controller/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.get("/user/me", verifyToken, Me);
  router.get("/user/grant-access/:id/:password", GrantAccess);
  router.post("/user/login", Login);
  // router.post("/user/register", Register);
  // router.put("/user/me/update/", verifyToken, UpdateMe);
};

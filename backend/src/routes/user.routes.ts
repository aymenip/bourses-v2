import express from "express";
import {
  Login,
  Register,
  Me,
  UpdateUser,
  GrantAccess,
} from "../user/controller/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.get("/user/me", verifyToken, Me);
  router.get("/user/grant-access/:id/:password", GrantAccess);
  router.post("/user/login", Login);
  router.put("/user/update", verifyToken, UpdateUser);
};

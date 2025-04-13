import express from "express";
import {
  CreateCertificate,
  DeleteCertificate,
  GetAllCertificates,
  GetAllCertificatesForUser,
  GetCertificateById,
  UpdateCertificate,
} from "../certificates/controller/certificate.controller";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/certificate/create", verifyToken, CreateCertificate);
  router.put("/certificate/update", verifyToken, UpdateCertificate);
  router.get("/certificate/user", verifyToken, GetAllCertificatesForUser);
  router.delete("/certificate/:id", verifyToken, DeleteCertificate);
  router.get("/certificate/all", verifyToken, isAdmin, GetAllCertificates);
  router.get("/certificate/:id", verifyToken, GetCertificateById);
};

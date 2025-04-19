import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import {
  CreateDocument,
  DeleteDocument,
  GetDocumentById,
} from "../document/controller/document.controller";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware";

// Ensure the 'uploads/thesis' directory exists
const UPLOADS_DIR = "uploads";
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  
}

// Multer storage configuration for 'thesis' documents
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    cb(null, UPLOADS_DIR); // Save files in 'uploads/thesis/'
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append timestamp for uniqueness
  },
});

const upload = multer({ storage: storage });

export default (router: express.Router) => {
  router.post(
    "/document/upload",
    verifyToken,
    upload.single("file"),
    CreateDocument
  );
  router.get("/document/:id", verifyToken, GetDocumentById);
  router.delete("/document/:id", verifyToken, DeleteDocument);
};

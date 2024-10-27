import express from "express";
import { AllTeachers, CreateTeacher, DeleteTeacher, ImportTeachersXlsx, ExportTeachersToXlsx, Teacher, UpdateTeacher, UpgradeTeacher } from "../teacher/controller/teacher.controller";
import { verifyToken } from "../middlewares/auth.middleware";

import multer from "multer";

// Multer configuration for handling file uploads
import fs from "fs";
const uploadsDir = '../../uploads'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync(uploadsDir, { recursive: true });
        cb(null, uploadsDir);
    },
});

const upload = multer({ storage: storage });

export default (router: express.Router) => {
    // CRUD
    router.post("/teacher/create", verifyToken, CreateTeacher);
    router.get("/teacher/all", verifyToken, AllTeachers);
    router.get("/teacher/:id", verifyToken, Teacher);
    router.put("/teacher/update", verifyToken, UpdateTeacher);
    router.delete("/teacher/delete/:id", verifyToken, DeleteTeacher);

    // Upgrade teacher
    router.post("/teacher/upgrade", verifyToken, UpgradeTeacher);

    // Import
    router.post("/teacher/import/xlsx", verifyToken, upload.single("file"), ImportTeachersXlsx);

    // Export
    router.get("/teacher/export/xlsx", verifyToken, ExportTeachersToXlsx);
}
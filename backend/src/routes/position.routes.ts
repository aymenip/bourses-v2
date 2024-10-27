import express from "express";
import { AllPositions, CreatePosition, DeletePosition, Position, UpdatePosition } from "../position/controller/position.controller";
import { verifyToken } from "../middlewares/auth.middleware";


export default (router: express.Router) => {
    router.post("/position/create", verifyToken, CreatePosition);
    router.get("/position/all", verifyToken, AllPositions);
    router.get("/position/:id", verifyToken, Position);
    router.put("/position/update", verifyToken, UpdatePosition);
    router.delete("/position/delete/:id", verifyToken, DeletePosition);
}
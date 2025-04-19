import express from "express";
import {
  AllEmployees,
  CreateEmployee,
  DeleteEmployee,
  Employee,
  UpdateEmployee,
} from "../employee/controller/employee.controller";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware";

export default (router: express.Router) => {
  router.post("/employee/create", verifyToken, isAdmin, CreateEmployee);
  router.get("/employee/all", verifyToken, isAdmin, AllEmployees);
  router.get("/employee/:id", verifyToken, isAdmin, Employee);
  router.put("/employee/update", verifyToken, isAdmin, UpdateEmployee);
  router.delete("/employee/delete/:id", verifyToken, isAdmin, DeleteEmployee);
};

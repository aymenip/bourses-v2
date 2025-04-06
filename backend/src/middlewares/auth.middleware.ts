import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SW } from "../utils/constants";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
export const verifyAdminKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminKey = req.header("X-ADMIN-KEY");
  if (!adminKey) return res.status(401).json({ error: SW });
  try {
    if (!(process.env.ADMIN_KEY === adminKey)) {
      return res.status(401).json({ error: SW });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req.user["role"] !== 1)) {
    res.status(401).json({ error: "Access denied" });
  } else {
    next();
  }
};

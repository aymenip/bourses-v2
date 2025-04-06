import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import router from "./routes";
import helmet from "helmet";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// ✅ Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const server = http.createServer(app);
app.use("/", router());

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

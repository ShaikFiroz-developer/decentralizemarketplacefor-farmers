import express from "express";
import multer from "multer";
import path from "path";
import * as dotenv from "dotenv";
import fs from "fs";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import jwt from "jsonwebtoken";

const app = express();
dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage: storage });

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const fileUrl = `http://localhost:8080/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

app.get("/", (req, res) => res.send("Hello from backend"));

const sessioncontroller = (req, res) => {
  try {
    const { email } = req.body;
    const token = jwt.sign({ email }, "this is a marketplace project secret", {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: false,
      maxAge: 3600 * 1000,
      path: "/",
      sameSite: "Lax",
    });
    res
      .status(200)
      .json({ message: `Session created for user ${email}`, email });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Failed to create session" });
  }
};

const sessionverifycontroller = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, "this is a marketplace project secret");
    res.status(200).json({ message: "Session verified", email: decoded.email });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

app.post("/setsession", cors(corsOptions), sessioncontroller);
app.post("/sessionverify", cors(corsOptions), sessionverifycontroller);

const startServer = async () => {
  try {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server running at port ${process.env.PORT || 8080}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

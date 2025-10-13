import express from "express";
import multer from "multer";
import { createCar, deleteCar, getCars, getCarsByUser } from "../controllers/carController.js";

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createCar);
router.get("/", getCars);
router.get("/user/:userId", getCarsByUser);
router.delete("/:id", deleteCar);

export default router;

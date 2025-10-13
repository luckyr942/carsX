import Car from "../models/carModel.js";

// Create (Upload) a car
export const createCar = async (req, res) => {
  try {
    const { userId, title, specs } = req.body;

    // If image was uploaded using multer
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!userId || !title || !imageUrl) {
      return res.status(400).json({ message: "userId, title, and image are required" });
    }

    const newCar = new Car({
      userId,
      title,
      specs,
      imageUrl,
    });

    await newCar.save();
    res.status(201).json({ message: "Car uploaded successfully!", car: newCar });
  } catch (err) {
    console.error("Error creating car:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all cars
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(cars);
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get cars by a specific user
export const getCarsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const cars = await Car.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(cars);
  } catch (err) {
    console.error("Error fetching user's cars:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a car
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ message: "Server error" });
  }
};

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../app/lib/firebase";

const sampleCars = [
  {
    name: "Lamborghini Urus",
    price: "$230,000",
    image: "https://i.pinimg.com/736x/2a/ee/34/2aee34b8f07abb7fb3a57c36c35cb85a.jpg",
    description: "Luxury SUV with performance and style.",
  },
  {
    name: "BMW M4",
    price: "$80,000",
    image: "https://i.pinimg.com/736x/17/18/4f/17184f87fb496c5670c712984ffad4bc.jpg",
    description: "A powerful sports coupe with precision handling.",
  },
  {
    name: "Tesla Model 3",
    price: "$45,000",
    image: "https://i.pinimg.com/736x/3c/f1/34/3cf13482ee0b3799ed8619932387b77a.jpg",
    description: "Electric sedan with autopilot capabilities.",
  },
];

async function uploadCars() {
  try {
    for (const car of sampleCars) {
      await addDoc(collection(db, "cars"), {
        ...car,
        userId: "demoUser",
        createdAt: serverTimestamp(),
      });
    }
    console.log("✅ Sample cars uploaded successfully!");
  } catch (error) {
    console.error("❌ Error uploading cars:", error);
  }
}

uploadCars();

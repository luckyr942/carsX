import admin from "firebase-admin";
import fs from "fs";
import path from "path";


// Try to initialize from .env first (stringified JSON), otherwise from file
const envKey = process.env.FIREBASE_SERVICE_ACCOUNT;
if (envKey) {
try {
const serviceAccount = JSON.parse(envKey);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
console.log("✅ Firebase Admin initialized from env FIREBASE_SERVICE_ACCOUNT");
} catch (err) {
console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT env var:", err.message);
}
} else {
const keyPath = path.join(process.cwd(), "server", "firebase-service-account.json");
if (fs.existsSync(keyPath)) {
const serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf8"));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
console.log("✅ Firebase Admin initialized from server/firebase-service-account.json");
} else {
console.warn("⚠️ Firebase service account not found. Firebase Admin not initialized. Add FIREBASE_SERVICE_ACCOUNT env or the json file.");
}
}


export default admin;
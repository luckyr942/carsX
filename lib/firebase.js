import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
 
const firebaseConfig = {
  apiKey: "AIzaSyA5qTD5eHF_htJKrrZtr0vb0syKhKIhoiA",
  authDomain: "carsx-d1916.firebaseapp.com",
  projectId: "carsx-d1916",
  storageBucket: "carsx-d1916.appspot.com",
  messagingSenderId: "478508006985",
  appId: "1:478508006985:web:6fa372d96795af4b190998",
  measurementId: "G-Z0RNL3RCFH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth with persistent login
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// ✅ Firestore with long polling enabled
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false, // helps on some Android devices
});

//Storage for the app feed
const storage = getStorage(app);

export { app, auth, db, storage };

import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BASE_URL = "http://10.29.119.225:4500"; // your backend IP

export default function AddCar() {
  const [title, setTitle] = useState("");
  const [specs, setSpecs] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // ✅ Replace this with your logged-in user's UID (from Firebase or local storage)
  const userId = "luckyraj2901"; // <-- change to actual userId dynamically

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!title || !specs || !image) {
      Alert.alert("Error", "Please fill all fields and upload an image!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("specs", specs);
    formData.append("image", {
      uri: image.uri,
      type: "image/jpeg",
      name: "car.jpg",
    });

    try {
      await axios.post(`${BASE_URL}/api/cars`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Alert.alert("✅ Success", "Car added successfully!");
      setTitle("");
      setSpecs("");
      setImage(null);
      router.push("/(tabs)/home");
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      Alert.alert("❌ Error", "Failed to upload car. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a New Car 🚘</Text>

      <TextInput
        placeholder="Car Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Car Specifications"
        style={[styles.input, { height: 100 }]}
        value={specs}
        onChangeText={setSpecs}
        multiline
      />

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.preview} />
        ) : (
          <Text style={styles.imageText}>📸 Upload Car Image</Text>
        )}
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#E63946" />
      ) : (
        <TouchableOpacity onPress={handleUpload} style={styles.uploadButton}>
          <Text style={styles.uploadText}>Upload Car</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  imageText: {
    color: "#666",
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  uploadButton: {
    backgroundColor: "#E63946",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  uploadText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

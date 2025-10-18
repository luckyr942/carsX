import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface User {
  name: string;
  username: string;
  email: string;
  bio?: string;
  location?: string;
  profilePic?: string;
}

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try { 
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.log("No token found. User not logged in.");
          return;
        }

        // ⚠️ Use your machine IP if testing on real device
        const response = await fetch("https://carsx-backend.onrender.com/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch profile:", response.status);
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.replace("Login" as never);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Photo */}
      <Image
        source={{ uri: user.profilePic || "https://via.placeholder.com/100" }}
        style={styles.profilePhoto}
      />

      {/* User Info */}
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.email}>{user.email}</Text>
      {user.bio && <Text style={styles.bio}>{user.bio}</Text>}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#ddd",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  bio: {
    fontSize: 14,
    color: "#777",
    marginVertical: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#ff3b30",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

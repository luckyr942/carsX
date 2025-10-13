import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CarCard from "../../components/CarCard";

export default function Home() {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cars from MongoDB backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:4500/api/cars"); // your backend endpoint
        setCars(res.data); // backend should return an array of cars
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const latestCar = cars.length > 0 ? cars[0] : null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9f9f9", padding: 16 }}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Lucky's Feed</Text>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => router.push("/(tabs)/profile")}
        >
          <Ionicons name="person-circle-outline" size={40} color="#333" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subHeader}>Explore what’s trending in CarsX 🚘</Text>

      {/* Latest Highlight */}
      {latestCar && (
        <View style={styles.highlightBox}>
          <View style={{ flex: 1 }}>
            <Text style={styles.highlightTitle}>Just Added!</Text>
            <Text style={styles.highlightSubtitle}>{latestCar.name}</Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>View</Text>
            </TouchableOpacity>
          </View>
          <Image source={{ uri: latestCar.image }} style={styles.highlightImage} />
        </View>
      )}

      {/* Marketplace Section */}
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cars in the Market</Text>
          <Text style={styles.viewAll}>View all</Text>
        </View>

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={cars}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={[styles.cardsearch, { width: 200 }]}>
                <CarCard {...item} />
              </View>
            )}
            keyExtractor={(item) => item._id} // MongoDB uses _id
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "600",
    color: "#222",
  },
  subHeader: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  profileBtn: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  highlightBox: {
    flexDirection: "row",
    backgroundColor: "#FFD966",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  highlightTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  highlightSubtitle: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10,
  },
  highlightImage: {
    width: 120,
    height: 80,
    resizeMode: "contain",
    marginLeft: 10,
  },
  exploreButton: {
    backgroundColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007AFF",
  },
  cardsearch: {
    height: 260,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

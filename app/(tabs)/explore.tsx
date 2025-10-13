import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 20; // two per row with spacing

export default function Explore() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://10.197.235.225:4500/api/cars");
        setCars(res.data);
      } catch (err) {
        console.log("❌ Error fetching cars:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading Cars...</Text>
      </View>
    );
  }

  if (cars.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No cars available yet 🚗</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cars}
      numColumns={2}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: `http://10.197.235.225:4500${item.imageUrl}` }}
            style={styles.image}
          />
          <Text style={styles.title}>{item.title}</Text>
          {item.specs && <Text style={styles.specs}>{item.specs}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#555" },
  emptyText: { fontSize: 18, fontWeight: "500", color: "#777" },
  list: { paddingHorizontal: 10, paddingBottom: 20 },
  card: {
    width: CARD_WIDTH,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },
  image: { width: "100%", height: 150, resizeMode: "cover" },
  title: { fontSize: 16, fontWeight: "600", padding: 8, color: "#222" },
  specs: { fontSize: 13, color: "#777", paddingHorizontal: 8, paddingBottom: 10 },
});

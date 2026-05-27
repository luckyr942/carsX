import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

type CarCardProps = {
  id: string;
  name: string;
  image: string;
  price: string;
};

export default function CarCard({ id, name, image, price }: CarCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        marginRight: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
      }}
      // onPress={() => router.push(`/car/${id}`)} // ✅ navigate to car details
    >
      <Image
        source={{ uri: image }}
        style={{
          width: "100%",
          height: 120,
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8 }}>
        {name}
      </Text>
      <Text style={{ fontSize: 14, color: "gray" }}>{price}</Text>
    </TouchableOpacity>
  );
}

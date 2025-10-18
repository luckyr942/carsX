import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const RADIUS = 140;
const CENTER_X = width / 2;
const CENTER_Y = height / 2.6;

const cars = [
  require("../../assets/images/onboardimg/bmw1.jpeg"),
  require("../../assets/images/onboardimg/ferrari.jpeg"),
  require("../../assets/images/onboardimg/gwagon.jpeg"),
  require("../../assets/images/onboardimg/lamborgini.jpeg"),
  require("../../assets/images/onboardimg/mclaren.jpeg"),
  require("../../assets/images/onboardimg/porsche.jpeg"),
];

export default function AnimatedCarsCircle() {
  const router = useRouter();
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(2 * Math.PI, {
        duration: 18000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  return (
    <LinearGradient
      colors={["#0f0c29", "#302b63", "#24243e"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text
          style={{
            position: "absolute",
            top: 20,
            alignSelf: "center",
            color: "white",
            fontSize: 36,
            fontFamily: "Lato-Bold",
            zIndex: 10,
          }}
        >
          carsX
        </Text>
      </View>

      {/* Rotating cars */}
      {cars.map((car, i) => {
        const AnimatedCar = () => {
          const animatedStyle = useAnimatedStyle(() => {
            const angle = (2 * Math.PI * i) / cars.length + rotation.value;
            const x = CENTER_X + RADIUS * Math.cos(angle);
            const y = CENTER_Y + RADIUS * Math.sin(angle);

            const minSize = 50;
            const maxSize = 90;
            const scale = minSize + (maxSize - minSize) * ((Math.sin(angle) + 1) / 2);

            return {
              position: "absolute",
              left: x - scale / 2,
              top: y - scale / 2,
              width: scale,
              height: scale,
              borderRadius: scale / 2,
              zIndex: Math.round(scale),
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
            };
          });

          return <Animated.Image source={car} style={[styles.car, animatedStyle]} resizeMode="cover" />;
        };

        return <AnimatedCar key={i} />;
      })}

      {/* Center Car */}
      <View style={styles.centerWrapper}>
        <LinearGradient colors={["#ff8c00", "#ff0080"]} style={styles.centerGlow}>
          <Image
            source={require("../../assets/images/onboardimg/mustang.jpeg")}
            style={styles.centerCar}
            resizeMode="cover"
          />
        </LinearGradient>
      </View>

      {/* Title and Buttons */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>Inspired Cars</Text>
        <Text style={styles.subtitle}>Experience the power and style that drives innovation.</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, { backgroundColor: "#ff0066" }]}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, { backgroundColor: "#ff8c00" }]}
            onPress={() => router.push("/signup")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 60,
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  car: {
    position: "absolute",
  },
  centerWrapper: {
    position: "absolute",
    left: CENTER_X - 90,
    top: CENTER_Y - 90,
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  centerGlow: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ff0080",
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  centerCar: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  bottomSection: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#b8b8b8",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#ff0066",
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

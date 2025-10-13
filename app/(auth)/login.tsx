import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../lib/firebase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/home");
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      // TODO: Replace with actual Google Sign-In logic
      console.log("Google login pressed");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };
  const isIOS = Platform.OS === "ios";

  return (
    <ImageBackground
      source={{uri:"https://i.pinimg.com/736x/30/8b/84/308b84471fa952bb4bd1eab0c6f56c1b.jpg"}}
      style={styles.background}
      resizeMode="cover"
      // blurRadius={}
    >
      <StatusBar style="light" /> 
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Welcome back, Chief</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* <Button title="Login" onPress={handleLogin} color="#1E90FF" /> */}

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity onPress={handleGoogleLogin} style={styles.socialIcon}>
        <Ionicons name="logo-google" size={32} color="#DB4437" />
         </TouchableOpacity>

        {/* Social login buttons */}
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.socialText}>Login with Google</Text>
        </TouchableOpacity>

        {isIOS && (
          <TouchableOpacity style={styles.appleButton}>

            <Text style={styles.socialText}>Login with Apple ID</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 60, // spacing from top
    // backgroundColor: "rgba(0,0,0,0.2)", // slight dark overlay for readability
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    fontFamily: "cursive",
    textShadowColor: "grey",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: "left",
    marginBottom: 30, // more space below title
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: "#fff",
  },
  error: {
    color: "red",
    marginTop: 12,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  googleButton: {
    backgroundColor: "#DB4437",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  appleButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },socialText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  socialIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

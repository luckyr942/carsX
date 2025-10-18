// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { StatusBar } from 'expo-status-bar';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { auth } from "../../lib/firebase";

// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.replace("/(tabs)/home");
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };
//   const handleGoogleLogin = async () => {
//     try {
//       console.log("Google login pressed");
//       router.replace("/(tabs)/home"); // Temporarily redirect (replace with actual Google Sign-In)
//     } catch (error) {
//       console.error("Google login failed:", error);
//     }
//   };

//   const isIOS = Platform.OS === "ios";

// // 
//   return (
//     <ImageBackground
//       source={{uri:"https://i.pinimg.com/736x/d3/2d/ca/d32dca350dffcaee263f5bbb551dff43.jpg"}}
//       style={styles.background}
//       resizeMode="cover"
    
//       // blurRadius={}
//     >
//       <StatusBar style="light" /> 
//     <KeyboardAvoidingView
//         style={styles.container}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <Text style={styles.title}>Welcome back, Chief</Text>

//         <View style={styles.inputWrapper}>
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             placeholderTextColor="#ccc"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             placeholderTextColor="#ccc"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//         </View>
//         {/* Login Button */}
//         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//           <Text style={styles.loginText}>Login</Text>
//         </TouchableOpacity>

//         {error ? <Text style={styles.error}>{error}</Text> : null}

//         {/* Google Login */}
//         <TouchableOpacity onPress={handleGoogleLogin} style={styles.socialIcon}>
//           <Ionicons name="logo-google" size={28} color="#DB4437" />
//           <Text style={styles.googleText}> Sign in with Google</Text>
//         </TouchableOpacity>

//         {/* Apple Login (only for iOS) */}
//         {isIOS && (
//           <TouchableOpacity style={styles.appleButton}>
//             <Ionicons name="logo-apple" size={28} color="#fff" />
//             <Text style={styles.socialText}> Sign in with Apple ID</Text>
//           </TouchableOpacity>
//         )}
//       </KeyboardAvoidingView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
    
    
//   },
//   container: {
//     flex: 1,
//     justifyContent: "flex-start",
//     paddingHorizontal: 24,
//     paddingTop: 60, // spacing from top
//     // backgroundColor: "rgba(0,0,0,0.2)", // slight dark overlay for readability
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "600",
//     color: "white",
//     fontFamily: "cursive",
//     textShadowColor: "grey",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//     textAlign: "left",
//     marginBottom: 30, // more space below title
//   },
//   inputWrapper: {
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: "rgba(0,0,0,0.6)",
//     borderWidth: 1,
//     borderColor: "#fff",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     color: "#fff",
//   },
//   error: {
//     color: "red",
//     marginTop: 12,
//     textAlign: "center",
//   },
//  loginButton: {
//     backgroundColor: "#1E90FF",
//     borderRadius: 8,
//     paddingVertical: 12,
//     marginBottom: 16,
//     alignItems: "center",
//   },
//   loginText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   googleText: {
//     color: "white",
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   socialIcon: {
//     flexDirection: "row",
//     backgroundColor: "rgba(255,255,255,0.15)",
//     padding: 12,
//     borderRadius: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 12,
//   },
//   appleButton: {
//     flexDirection: "row",
//     backgroundColor: "#000",
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   socialText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 10,
//   },
// });



import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://carsx.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.token) {
        // ✅ Save the token to AsyncStorage
        await AsyncStorage.setItem("token", data.token);
  
        console.log("Token saved:", data.token);
  
        router.replace("/(tabs)/home"); // or navigation.replace("Home")
      } else {
        console.log("Login failed:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("Google login pressed");
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const isIOS = Platform.OS === "ios";

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/59/45/bd/5945bde9b67d659c96d263b19ea2f762.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      
          <View style={styles.topSection}>
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

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style ={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleGoogleLogin}
              style={styles.socialIcon}
            >
              <Ionicons name="logo-google" size={28} color="#DB4437" />
              <Text style={styles.googleText}> Sign in with Google</Text>
            </TouchableOpacity>

            {isIOS && (
              <TouchableOpacity style={styles.appleButton}>
                <Ionicons name="logo-apple" size={28} color="#fff" />
                <Text style={styles.socialText}> Sign in with Apple ID</Text>
              </TouchableOpacity>
            )}
            </View>
          </View>
        
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
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topSection: {
    paddingHorizontal: 24,
    justifyContent:"flex-start",
    paddingTop: 80, // pushes content slightly down from top
    alignItems: "flex-start", // align to the left
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
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 20,
    width: "100%",
  },
  input: {
    backgroundColor: "#581C1C",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    color: "#fff",
    width: "100%",
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
    width: "100%",
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonContainer:{
    marginLeft:10,
    marginTop: 30,
    alignItems: "center",
    gap: 10, 
  },
  googleText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  socialIcon: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    width: "100%",
    
  },
  appleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "85%",
  },
  socialText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});





// import React from "react";

// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.replace("/(tabs)/home");
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       console.log("Google login pressed");
//       router.replace("/(tabs)/home"); // Temporary navigation
//     } catch (error) {
//       console.error("Google login failed:", error);
//     }
//   };

//   const isIOS = Platform.OS === "ios";

//   return (
//     <ImageBackground
//       source={{
//         uri: "https://i.pinimg.com/736x/d3/2d/ca/d32dca350dffcaee263f5bbb551dff43.jpg",
//       }}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <StatusBar style="light" />
//       <KeyboardAvoidingView
//         behavior={isIOS ? "padding" : "height"}
//         style={styles.container}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           <Text style={styles.title}>Welcome back, Chief</Text>

//           <View style={styles.inputWrapper}>
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               placeholderTextColor="#ccc"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor="#ccc"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//           </View>

//           {/* Login Button */}
//           <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//             <Text style={styles.loginText}>Login</Text>
//           </TouchableOpacity>

//           {error ? <Text style={styles.error}>{error}</Text> : null}

//           {/* Google Login */}
//           <TouchableOpacity onPress={handleGoogleLogin} style={styles.socialIcon}>
//             <Ionicons name="logo-google" size={28} color="#DB4437" />
//             <Text style={styles.googleText}> Sign in with Google</Text>
//           </TouchableOpacity>

//           {/* Apple Login (only for iOS) */}
//           {isIOS && (
//             <TouchableOpacity style={styles.appleButton}>
//               <Ionicons name="logo-apple" size={28} color="#fff" />
//               <Text style={styles.socialText}> Sign in with Apple ID</Text>
//             </TouchableOpacity>
//           )}
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//   },
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     justifyContent: "flex-start", // ensures content stays at top
//     paddingHorizontal: 24,
//     paddingTop: 80, // space from top
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "700",
//     color: "white",
//     fontFamily: "serif",
//     textShadowColor: "rgba(0,0,0,0.4)",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 3,
//     marginBottom: 30,
//   },
//   inputWrapper: {
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderWidth: 1,
//     borderColor: "#fff",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     color: "#fff",
//   },
//   loginButton: {
//     backgroundColor: "#1E90FF",
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   loginText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   error: {
//     color: "red",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   socialIcon: {
//     flexDirection: "row",
//     backgroundColor: "rgba(255,255,255,0.15)",
//     padding: 12,
//     borderRadius: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 12,
//   },
//   googleText: {
//     color: "white",
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   appleButton: {
//     flexDirection: "row",
//     backgroundColor: "#000",
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   socialText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 10,
//   },
// });
// // 
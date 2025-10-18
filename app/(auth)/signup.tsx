// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { useRouter } from "expo-router";
// // import React, { useState } from "react";
// // import {
// //   ActivityIndicator,
// //   Alert,
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View
// // } from "react-native";

// // export default function SignUpScreen() {
// //   const router = useRouter();

// //   const [name, setName] = useState("");
// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleSignUp = async () => {
// //     if (!name || !username || !email || !password) {
// //       Alert.alert("Error", "Please fill in all fields.");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       // 🔹 Call your backend API instead of Firebase
// //       const response = await fetch("http://localhost:4500/api/auth/register", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           name,
// //           username,
// //           email,
// //           password,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.message || "Signup failed");
// //       }

// //       // 🔹 Save token locally (for auto-login)
// //       await AsyncStorage.setItem("token", data.user.token);

// //       Alert.alert("Success", "Account created successfully!");
// //       router.replace("/home"); // Go to home or main tab

// //     } catch (error: any) {
// //       console.error("Signup error:", error);
// //       Alert.alert("Signup Failed", error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Create Your Account</Text>
      
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Full Name"
// //         placeholderTextColor="#999"
// //         value={name}
// //         onChangeText={setName}
// //       />

// //       <TextInput
// //         style={styles.input}
// //         placeholder="Username"
// //         placeholderTextColor="#999"
// //         value={username}
// //         onChangeText={setUsername}
// //         autoCapitalize="none"
// //       />

// //       <TextInput
// //         style={styles.input}
// //         placeholder="Email"
// //         placeholderTextColor="#999"
// //         value={email}
// //         onChangeText={setEmail}
// //         keyboardType="email-address"
// //         autoCapitalize="none"
// //       />

// //       <TextInput
// //         style={styles.input}
// //         placeholder="Password"
// //         placeholderTextColor="#999"
// //         value={password}
// //         onChangeText={setPassword}
// //         secureTextEntry
// //       />

// //       <TouchableOpacity 
// //         style={styles.button} 
// //         onPress={handleSignUp}
// //         disabled={loading}
// //       >
// //         {loading ? (
// //           <ActivityIndicator color="#fff" />
// //         ) : (
// //           <Text style={styles.buttonText}>Sign Up</Text>
// //         )}
// //       </TouchableOpacity>

// //       <TouchableOpacity 
// //         onPress={() => router.replace("/login")}
// //         style={styles.loginLink}
// //       >
// //         <Text style={styles.loginText}>
// //           Already have an account? Log In
// //         </Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#000",
// //     justifyContent: "center",
// //     padding: 30,
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: "bold",
// //     color: "#fff",
// //     marginBottom: 40,
// //     textAlign: "center",
// //   },
// //   input: {
// //     height: 50,
// //     backgroundColor: "#1c1c1c",
// //     borderRadius: 10,
// //     paddingHorizontal: 15,
// //     color: "#fff",
// //     fontSize: 16,
// //     marginBottom: 15,
// //     borderWidth: 1,
// //     borderColor: "#333",
// //   },
// //   button: {
// //     height: 50,
// //     backgroundColor: "#ff4081",
// //     borderRadius: 10,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginTop: 20,
// //   },
// //   buttonText: {
// //     color: "#fff",
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// //   loginLink: {
// //     marginTop: 20,
// //     alignItems: "center",
// //   },
// //   loginText: {
// //     color: "#ff4081",
// //     fontSize: 14,
// //   },
// // });


// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { useRouter } from "expo-router";
// // import { createUserWithEmailAndPassword } from "firebase/auth";
// // import { useState } from "react";
// // import {
// //   Alert
// // } from "react-native";
// // import { auth } from "../../lib/firebase";

// // export default function SignUpScreen() {
// //   const router = useRouter();
// //   const [name, setName] = useState("");
// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleSignUp = async () => {
// //     if (!name || !username || !email || !password) {
// //       Alert.alert("Error", "Please fill in all fields.");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       // Step 1: Create user in Firebase
// //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// //       const { uid } = userCredential.user;

// //       // Step 2: Save user info in MongoDB
// //       const response = await fetch("http://localhost:4500/api/auth/register", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           firebaseUid: uid,
// //           name,
// //           username,
// //           email,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) throw new Error(data.message || "Signup failed");

// //       // Step 3: Save user data locally
// //       await AsyncStorage.setItem("user", JSON.stringify(data.user));

// //       Alert.alert("Success", "Account created successfully!");
// //       router.replace("/(tabs)/home");
// //     } catch (error) {
// //       console.error("Signup error:", error);
// //       Alert.alert("Signup Failed", error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// // };


// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import React, { useState } from "react";
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function Signup() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: "",
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSignup = async () => {
//     const { name, username, email, password, confirmPassword } = formData;

//     if (!name || !username || !email || !password || !confirmPassword) {
//       Alert.alert("Missing Fields", "Please fill in all fields.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert("Password Error", "Passwords do not match.");
//       return;
//     }

//     try {
//       // Replace this with your actual backend call
//       const res = await fetch("http://YOUR_SERVER_URL/api/users/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, username, email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Signup failed");

//       Alert.alert("Success", "Account created successfully!");
//       router.replace("/login");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <LinearGradient
//       colors={["#0f0c29", "#302b63", "#24243e"]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       style={styles.container}
//     >
//       <StatusBar style="light" />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//         style={{ flex: 1 }}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scroll}
//           keyboardShouldPersistTaps="handled"
//         >
//           <Text style={styles.header}>Create Account</Text>
//           <Text style={styles.subHeader}>Join CarsX and start your journey</Text>

//           <View style={styles.inputContainer}>
//             <TextInput
//               placeholder="Full Name"
//               placeholderTextColor="#aaa"
//               value={formData.name}
//               onChangeText={(val) => handleChange("name", val)}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Username"
//               placeholderTextColor="#aaa"
//               value={formData.username}
//               onChangeText={(val) => handleChange("username", val)}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Email Address"
//               placeholderTextColor="#aaa"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               value={formData.email}
//               onChangeText={(val) => handleChange("email", val)}
//               style={styles.input}
//             />
//             <TextInput
//   placeholder="Password"
//   placeholderTextColor="#aaa"
//   secureTextEntry
//   style={styles.input}
//   value={password}
//   onChangeText={setPassword}
//   textContentType="newPassword"   // ✅ tells iOS this is a new password field
//   autoComplete="off"              // ✅ disables autofill suggestions
//   autoCorrect={false}
//   autoCapitalize="none"
// />

// <TextInput
//   placeholder="Confirm Password"
//   placeholderTextColor="#aaa"
//   secureTextEntry
//   style={styles.input}
//   value={confirmPassword}
//   onChangeText={setConfirmPassword}
//   textContentType="none"          // ✅ prevents iOS from treating it like another password field
//   autoComplete="off"
//   autoCorrect={false}
//   autoCapitalize="none"
// />

//           </View>

//           <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleSignup}>
//             <LinearGradient
//               colors={["#ff8c00", "#ff0066"]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.gradientButton}
//             >
//               <Text style={styles.buttonText}>Sign Up</Text>
//             </LinearGradient>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => router.replace("/login")}>
//             <Text style={styles.loginText}>
//               Already have an account?{" "}
//               <Text style={{ color: "#ff0066" }}>Login</Text>
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scroll: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 25,
//   },
//   header: {
//     color: "#fff",
//     fontSize: 34,
//     fontWeight: "700",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   subHeader: {
//     color: "#b8b8b8",
//     fontSize: 14,
//     marginBottom: 40,
//     textAlign: "center",
//   },
//   inputContainer: {
//     width: "100%",
//   },
//   input: {
//     backgroundColor: "rgba(255,255,255,0.1)",
//     color: "#fff",
//     borderRadius: 12,
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.2)",
//   },
//   button: {
//     width: "100%",
//     borderRadius: 30,
//     overflow: "hidden",
//     marginTop: 20,
//     marginBottom: 15,
//   },
//   gradientButton: {
//     paddingVertical: 15,
//     alignItems: "center",
//     borderRadius: 30,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   loginText: {
//     color: "#aaa",
//     fontSize: 14,
//   },
// });


import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignup = async () => {
    const { name, username, email, password, confirmPassword } = formData;

    if (!name || !username || !email || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Error", "Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("https://carsx.onrender.com/api/auth/register", 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      Alert.alert("Success", "Account created successfully!");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <LinearGradient
      colors={["#0f0c29", "#302b63", "#24243e"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>Create Account</Text>
          <Text style={styles.subHeader}>Join CarsX and start your journey</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#aaa"
              value={formData.name}
              onChangeText={(val) => handleChange("name", val)}
              style={styles.input}
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={formData.username}
              onChangeText={(val) => handleChange("username", val)}
              style={styles.input}
            />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(val) => handleChange("email", val)}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={formData.password}
              onChangeText={(val) => handleChange("password", val)}
              style={styles.input}
              textContentType="newPassword"
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(val) => handleChange("confirmPassword", val)}
              style={styles.input}
              textContentType="none"
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleSignup}>
            <LinearGradient
              colors={["#ff8c00", "#ff0066"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text style={{ color: "#ff0066" }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingBottom: 50, // prevents bottom button from being hidden
  },
  header: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeader: {
    color: "#b8b8b8",
    fontSize: 14,
    marginBottom: 40,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  button: {
    width: "100%",
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 20,
    marginBottom: 15,
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  loginText: {
    color: "#aaa",
    fontSize: 14,
  },
});

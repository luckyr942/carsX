// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import { ActivityIndicator, View } from "react-native";

// export default function Index() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkOnboardingStatus = async () => {
//       try {
//         const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");

//         if (!hasSeenOnboarding) {
//           router.replace("/(auth)/onboarding");
//         } else {
//           router.replace("/(auth)/login");
//         }
//       } catch (error) {
//         console.log("Error checking onboarding:", error);
//         router.replace("/(auth)/onboarding");
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkOnboardingStatus();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   return null;
// }


import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
        const userData = await AsyncStorage.getItem("user");

        if (!hasSeenOnboarding) {
          // 👇 First-time user → show onboarding
          router.replace("/(auth)/onboarding");
        } else if (userData) {
          // 👇 User already logged in → go to home
          router.replace("/(tabs)/home");
        } else {
          // 👇 User has seen onboarding but not logged in → go to login/signup
          router.replace("/(auth)/login");
        }
      } catch (error) {
        console.log("Error checking user status:", error);
        router.replace("/(auth)/onboarding");
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return null;
}

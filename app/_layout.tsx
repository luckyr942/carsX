// // import { Stack } from "expo-router";
// // import { useAuth } from "../hooks/useAuth";

// // export default function RootLayout() {
// //   const { user, loading } = useAuth();

// //   if (loading) return null; // could show splash screen

// //   return (
// //     <Stack screenOptions={{ headerShown: false }}>
// //       {user ? (
// //         <Stack.Screen name="(tabs)" />
// //       ) : (
// //         <Stack.Screen name="(auth)" />
// //       )}
// //     </Stack>
// //   );
// // }

// // app/_layout.tsx or app/index.tsx
// // import Login from "./(auth)/login";

// // export default function AppLayout() {
// //   return <Login />;
// // }

// import { Stack } from "expo-router";
// import { useAuth } from "../hooks/useAuth";

// export default function RootLayout() {
//   const { user } = useAuth();

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       {user ? (
//         <Stack.Screen name="(tabs)" />
//       ) : (
//         <Stack.Screen name="(auth)" />
//       )}
//     </Stack>
//   );
// }

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Auth & Tabs groups are automatically nested */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}



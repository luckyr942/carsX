import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout(){
  return (
    <Tabs 
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#e63946",   // active color (CarsX theme)
      tabBarInactiveTintColor: "#777",    // inactive color
      tabBarStyle: {
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        height: 60,
        paddingBottom: 5,
      },
    }}
    >
      <Tabs.Screen 
      name ="home" 
      options={{
        title:"Home",
        tabBarIcon:({color,size})=>(
          <Ionicons name="home" size={size} color={color}/>
        ),
      }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title:"Explore",
          tabBarIcon:({color,size})=>(
            <Ionicons name="compass" size={size} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shows"
        options={{
          title: "Shows",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car-sport" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
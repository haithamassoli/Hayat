import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const HomeTabs = () => {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          title: "Profile",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
          title: "Search",
        }}
      />
    </Tabs>
  );
};

export default HomeTabs;

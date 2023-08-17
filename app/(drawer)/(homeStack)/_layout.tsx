import { Stack } from "expo-router";

const HomeStack = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerBackTitle: "الرجوع",
        headerBackTitleVisible: false,
        headerShown: false,
        headerTitleStyle: {
          fontFamily: "CairoBold",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="chats/[id]"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="videos/[id]"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="categories/[id]"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
};

export default HomeStack;

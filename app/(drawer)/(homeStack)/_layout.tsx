import { ms } from "@utils/platform";
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
          fontSize: ms(16),
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

import { Feather } from "@expo/vector-icons";
import CustomDrawer from "@src/layouts/custom-drawer";
import { ms } from "@utils/platform";
import { Drawer } from "expo-router/drawer";

const HomeDrawer = () => {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerPosition: "left",
        drawerType: "front",
        headerTitleStyle: {
          fontFamily: "CairoBold",
          fontSize: ms(16),
        },
        drawerStyle: {
          width: "68%",
        },
        headerLeft: () => null,
      }}
    >
      <Drawer.Screen
        name="(homeStack)"
        options={{
          title: "الرئيسة",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="notifications"
        options={{
          title: "الإشعارات",
          drawerIcon: ({ color, size }) => (
            <Feather name="bell" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          headerTitle: "الملف الشخصي",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="contact"
        options={{
          title: "تواصل معنا",
          drawerIcon: ({ color, size }) => (
            <Feather name="mail" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: "عن تطبيق حياة",
          drawerIcon: ({ color, size }) => (
            <Feather name="info" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default HomeDrawer;

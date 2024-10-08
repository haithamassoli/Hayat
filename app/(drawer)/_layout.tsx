import { Feather } from "@expo/vector-icons";
import CustomDrawer from "@src/layouts/custom-drawer";
import { IconSize } from "@styles/size";
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
          drawerIcon: ({ color }) => (
            <Feather name="home" size={IconSize.m} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="notifications"
        options={{
          title: "الإشعارات",
          drawerIcon: ({ color }) => (
            <Feather name="bell" size={IconSize.m} color={color} />
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
          drawerIcon: ({ color }) => (
            <Feather name="mail" size={IconSize.m} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: "عن تطبيق حياة",
          drawerIcon: ({ color }) => (
            <Feather name="info" size={IconSize.m} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default HomeDrawer;

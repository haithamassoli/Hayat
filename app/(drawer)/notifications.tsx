import HeaderRight from "@components/headerRight";
import { Box, ReText } from "@styles/theme";
import { useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";

const Notifications = () => {
  const navigation: any = useNavigation();
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Drawer.Screen
        options={{
          headerRight: () => (
            <HeaderRight onPress={() => navigation.openDrawer()} />
          ),
        }}
      />
      <ReText variant="DisplayMedium" textAlign="center">
        لا يوجد إشعارات حالياً
      </ReText>
      <ReText variant="BodySmall">حياة</ReText>
    </Box>
  );
};

export default Notifications;

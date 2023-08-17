import { TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Divider, Drawer } from "react-native-paper";
import { Box, ReText, Theme } from "@styles/theme";
import { IconSize } from "@styles/size";
import { useTheme } from "@shopify/restyle";
import { useStore } from "@zustand/store";
import { ms, vs } from "@utils/platform";
import Loading from "@components/loading";
import { logoutMutation } from "@apis/auth";

const CustomDrawer = (props: any) => {
  const { navigation } = props;
  const { toggleTheme, isDark, user } = useStore();
  const { colors } = useTheme<Theme>();
  const onToggleTheme = () => toggleTheme();
  const { mutate, isLoading } = logoutMutation();

  if (isLoading) return <Loading />;

  return (
    <Box flex={1}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity onPress={() => navigation.navigate("profile")}>
          <Box alignItems="center" padding="hm" flexDirection="row" gap="hs">
            <Box
              justifyContent="center"
              alignItems="center"
              style={{
                height: ms(72),
                width: ms(72),
                borderRadius: ms(36),
                overflow: "hidden",
              }}
            >
              <Feather name="user" color={colors.ternary} size={IconSize.xl} />
            </Box>
            <Box alignItems={"center"}>
              <ReText variant="TitleMedium" textAlign="center" color="ternary">
                الملف الشخصي
              </ReText>
              <ReText variant="TitleSmall" color="ternary" textAlign="center">
                {!!user ? user.email.split("@")[0] : "تسجيل الدخول"}
              </ReText>
            </Box>
          </Box>
        </TouchableOpacity>
        <Box flex={1} paddingTop="vs">
          {props.state.routes.map((route: any, index: number) => {
            const { options } = props.descriptors[route.key];
            if (options.drawerIcon === undefined) return null;
            const label =
              options.drawerLabel !== undefined
                ? options.drawerLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = props.state.index === index;

            const onPress = () => {
              props.navigation.navigate(route.name);
            };

            return (
              <Drawer.Item
                key={route.key}
                label={label}
                active={isFocused}
                onPress={onPress}
                icon={options.drawerIcon}
              />
            );
          })}
        </Box>
      </DrawerContentScrollView>
      <Divider horizontalInset bold />
      <Box padding="hm">
        <TouchableOpacity
          onPress={onToggleTheme}
          style={{ paddingVertical: vs(16) }}
        >
          <Box flexDirection="row" alignItems="center">
            <Feather
              name={isDark ? "sun" : "moon"}
              color={colors.text}
              size={IconSize.m}
            />
            <ReText variant="LabelLarge" marginLeft="hs" fontFamily="CairoBold">
              {isDark ? "الوضع النهاري" : "الوضع الليلي"}
            </ReText>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={{ paddingVertical: vs(16) }}
        >
          <Box flexDirection={"row"} alignItems={"center"}>
            <Ionicons
              name="share-social-outline"
              color={colors.text}
              size={IconSize.m}
            />
            <ReText variant="LabelLarge" marginLeft="hs" fontFamily="CairoBold">
              شارك مع أصدقائك
            </ReText>
          </Box>
        </TouchableOpacity>
        {!!user && (
          <TouchableOpacity
            onPress={() => mutate()}
            style={{ paddingVertical: vs(16) }}
          >
            <Box flexDirection={"row"} alignItems={"center"}>
              <Ionicons
                name="exit-outline"
                color={colors.text}
                size={IconSize.m}
              />
              <ReText
                variant="LabelLarge"
                marginLeft="hs"
                fontFamily="CairoBold"
              >
                تسجيل خروج
              </ReText>
            </Box>
          </TouchableOpacity>
        )}
      </Box>
    </Box>
  );
};

export default CustomDrawer;

import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as ReThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { useStore } from "@zustand/store";
import { useFonts } from "expo-font";
import { FlashList } from "@shopify/flash-list";
import {
  PaperProvider,
  MD3LightTheme,
  TextInput,
  configureFonts,
  Text,
} from "react-native-paper";
import { useCallback, useEffect } from "react";
import { MaterialDark, MaterialLight, fontConfig } from "@styles/material";
import { ThemeProvider } from "@react-navigation/native";
import theme, { Box, ReText, darkTheme } from "@styles/theme";
import Colors from "@styles/colors";
import { I18nManager, Platform, ScrollView, UIManager } from "react-native";
import { Stack, SplashScreen, useSegments, router } from "expo-router";
import {
  DarkNavigationColors,
  LightNavigationColors,
} from "@styles/navigation";
import RNRestart from "react-native-restart";
import { getDataFromStorage } from "@utils/helper";
import { ColorSchemeProvider, useColorScheme } from "@src/ColorSchemeContext";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: Infinity,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "(drawer)",
};

SplashScreen.preventAutoHideAsync();

const getUserFromStorage = async () => {
  try {
    const user = await getDataFromStorage("user");
    if (user) useStore.setState({ user });
  } catch (error) {
    console.log(error);
  }
};

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
ReText.defaultProps = ReText.defaultProps || {};
ReText.defaultProps.allowFontScaling = false;

ScrollView.defaultProps = ScrollView.defaultProps || {};
ScrollView.defaultProps.showsVerticalScrollIndicator = false;
ScrollView.defaultProps.showsHorizontalScrollIndicator = false;

FlashList.defaultProps = FlashList.defaultProps || {};
FlashList.defaultProps.showsVerticalScrollIndicator = false;
FlashList.defaultProps.showsHorizontalScrollIndicator = false;

export default function RootLayout() {
  const segments = useSegments();
  const { user } = useStore();

  const forceRTL = () => {
    if (!I18nManager.isRTL) {
      try {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
        RNRestart.restart();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    forceRTL();
    getUserFromStorage();
  }, []);

  useEffect(() => {
    // @ts-ignore
    const inAuthGroup = segments.includes("profile");
    if (!user && inAuthGroup) {
      router.replace("/sign-in");
    } else if (user && segments[0] === "(auth)") {
      router.replace("/");
    }
    console.log(segments);
  }, [user, segments]);

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider>
        <App />
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}

export const App = () => {
  const { isDark } = useColorScheme();

  const [fontsLoaded] = useFonts({
    CairoReg: require("@assets/fonts/Cairo-Reg.ttf"),
    CairoBold: require("@assets/fonts/Cairo-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const materialTheme: any = {
    ...MD3LightTheme,
    dark: isDark,
    isV3: true,
    version: 3,
    colors: isDark
      ? { ...MD3LightTheme.colors, ...MaterialDark }
      : { ...MD3LightTheme.colors, ...MaterialLight },
    fonts: configureFonts({ config: fontConfig }),
  };

  return (
    <ReThemeProvider theme={isDark ? darkTheme : theme}>
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={
          isDark ? Colors.darkBackground : Colors.lightBackground
        }
      />
      <PaperProvider theme={materialTheme}>
        <ThemeProvider
          value={isDark ? DarkNavigationColors : LightNavigationColors}
        >
          <Box flex={1} onLayout={onLayoutRootView}>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_left",
              }}
            />
          </Box>
        </ThemeProvider>
      </PaperProvider>
    </ReThemeProvider>
  );
};

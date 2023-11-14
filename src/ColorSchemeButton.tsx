import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "@shopify/restyle";
import { Box, ReText, Theme } from "@styles/theme";
import { useColorScheme } from "./ColorSchemeContext";
import { ms } from "@utils/platform";

export const ColorSchemeButton = () => {
  const { colors } = useTheme<Theme>();
  const { toggle, isDark, active } = useColorScheme();
  const tap = Gesture.Tap()
    .runOnJS(true)
    .onStart((e) => {
      if (!active) {
        toggle(e.absoluteX, e.absoluteY);
      }
    });
  return (
    <GestureDetector gesture={tap}>
      <Box flexDirection="row" alignItems="center" paddingVertical="vs">
        <Feather
          name={isDark ? "sun" : "moon"}
          color={colors.text}
          size={ms(24)}
        />
        <ReText variant="LabelLarge" marginLeft="hs" fontFamily="CairoBold">
          {isDark ? "الوضع النهاري" : "الوضع الليلي"}
        </ReText>
      </Box>
    </GestureDetector>
  );
};

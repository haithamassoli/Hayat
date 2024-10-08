// https://callstack.github.io/react-native-paper/docs/guides/theming#creating-dynamic-theme-colors

import { hs, ms, vs } from "@utils/platform";

export const MaterialLight = {
  primary: "rgb(0, 105, 109)",
  onPrimary: "rgb(255, 255, 255)",
  primaryContainer: "rgb(111, 246, 252)",
  onPrimaryContainer: "rgb(0, 32, 33)",
  secondary: "rgb(187, 21, 44)",
  onSecondary: "rgb(255, 255, 255)",
  secondaryContainer: "rgb(255, 218, 216)",
  onSecondaryContainer: "rgb(65, 0, 7)",
  tertiary: "rgb(77, 95, 124)",
  onTertiary: "rgb(255, 255, 255)",
  tertiaryContainer: "rgb(213, 227, 255)",
  onTertiaryContainer: "rgb(7, 28, 54)",
  error: "rgb(186, 26, 26)",
  onError: "rgb(255, 255, 255)",
  errorContainer: "rgb(255, 218, 214)",
  onErrorContainer: "rgb(65, 0, 2)",
  background: "rgb(250, 253, 252)",
  onBackground: "rgb(25, 28, 28)",
  surface: "rgb(250, 253, 252)",
  onSurface: "rgb(25, 28, 28)",
  surfaceVariant: "rgb(218, 228, 228)",
  onSurfaceVariant: "rgb(63, 73, 73)",
  outline: "rgb(111, 121, 121)",
  outlineVariant: "rgb(190, 200, 200)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(45, 49, 49)",
  inverseOnSurface: "rgb(239, 241, 241)",
  inversePrimary: "rgb(76, 217, 223)",
  elevation: {
    level0: "transparent",
    level1: "rgb(238, 246, 245)",
    level2: "rgb(230, 241, 241)",
    level3: "rgb(223, 237, 236)",
    level4: "rgb(220, 235, 235)",
    level5: "rgb(215, 232, 232)",
  },
  surfaceDisabled: "rgba(25, 28, 28, 0.12)",
  onSurfaceDisabled: "rgba(25, 28, 28, 0.38)",
  backdrop: "rgba(41, 50, 51, 0.4)",
};

export const MaterialDark = {
  primary: "rgb(76, 217, 223)",
  onPrimary: "rgb(0, 55, 57)",
  primaryContainer: "rgb(0, 79, 82)",
  onPrimaryContainer: "rgb(111, 246, 252)",
  secondary: "rgb(255, 179, 177)",
  onSecondary: "rgb(104, 0, 17)",
  secondaryContainer: "rgb(146, 0, 28)",
  onSecondaryContainer: "rgb(255, 218, 216)",
  tertiary: "rgb(181, 199, 233)",
  onTertiary: "rgb(31, 49, 76)",
  tertiaryContainer: "rgb(53, 71, 100)",
  onTertiaryContainer: "rgb(213, 227, 255)",
  error: "rgb(255, 180, 171)",
  onError: "rgb(105, 0, 5)",
  errorContainer: "rgb(147, 0, 10)",
  onErrorContainer: "rgb(255, 180, 171)",
  background: "rgb(25, 28, 28)",
  onBackground: "rgb(224, 227, 226)",
  surface: "rgb(25, 28, 28)",
  onSurface: "rgb(224, 227, 226)",
  surfaceVariant: "rgb(63, 73, 73)",
  onSurfaceVariant: "rgb(190, 200, 200)",
  outline: "rgb(137, 147, 147)",
  outlineVariant: "rgb(63, 73, 73)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(224, 227, 226)",
  inverseOnSurface: "rgb(45, 49, 49)",
  inversePrimary: "rgb(0, 105, 109)",
  elevation: {
    level0: "transparent",
    level1: "rgb(28, 37, 38)",
    level2: "rgb(29, 43, 44)",
    level3: "rgb(31, 49, 50)",
    level4: "rgb(31, 51, 51)",
    level5: "rgb(32, 55, 55)",
  },
  surfaceDisabled: "rgba(224, 227, 226, 0.12)",
  onSurfaceDisabled: "rgba(224, 227, 226, 0.38)",
  backdrop: "rgba(41, 50, 50, 0.4)",
};

export const fontConfig = {
  DisplayLarge: {
    fontFamily: "CairoBold",
    lineHeight: vs(70),
    fontSize: ms(57),
  },
  DisplayMedium: {
    fontFamily: "CairoReg",
    lineHeight: vs(58),
    fontSize: ms(45),
  },
  DisplaySmall: {
    fontFamily: "CairoReg",
    lineHeight: vs(50),
    fontSize: ms(36),
  },
  headlineLarge: {
    fontFamily: "CairoReg",
    lineHeight: vs(46),
    fontSize: ms(32),
  },
  headlineMedium: {
    fontFamily: "CairoReg",
    lineHeight: vs(42),
    fontSize: ms(28),
  },
  headlineSmall: {
    fontFamily: "CairoBold",
    lineHeight: vs(38),
    fontSize: ms(24),
  },
  titleLarge: {
    fontFamily: "CairoReg",
    lineHeight: vs(34),
    fontSize: ms(22),
  },
  titleMedium: {
    fontFamily: "CairoReg",
    lineHeight: vs(30),
    fontSize: ms(16),
    letterSpacing: hs(0.15),
  },
  titleSmall: {
    fontFamily: "CairoBold",
    lineHeight: vs(26),
    fontSize: ms(14),
    letterSpacing: hs(0.1),
  },
  labelLarge: {
    fontFamily: "CairoBold",
    lineHeight: vs(26),
    fontSize: ms(14),
    letterSpacing: hs(0.1),
  },
  labelMedium: {
    fontFamily: "CairoReg",
    lineHeight: vs(22),
    fontSize: ms(12),
    letterSpacing: hs(0.5),
  },
  labelSmall: {
    fontFamily: "CairoReg",
    lineHeight: vs(22),
    fontSize: ms(11),
    letterSpacing: hs(0.5),
  },
  bodyLarge: {
    fontFamily: "CairoBold",
    lineHeight: vs(30),
    fontSize: ms(16),
    letterSpacing: hs(0.15),
  },
  bodyMedium: {
    fontFamily: "CairoReg",
    lineHeight: vs(26),
    fontSize: ms(14),
    letterSpacing: hs(0.25),
  },
  bodySmall: {
    fontFamily: "CairoReg",
    lineHeight: vs(22),
    fontSize: ms(12),
    letterSpacing: hs(0.4),
  },
};

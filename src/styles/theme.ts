import { createBox, createText, createTheme } from "@shopify/restyle";
import Borders from "./border";
import Colors from "./colors";
import Spacing from "./spacing";
import { FontSize } from "./size";
import { fontSizing } from "@utils/platform";

const theme = createTheme({
  colors: {
    mainBackground: Colors.lightBackground,
    secBackground: Colors.lightBackgroundSec,
    text: Colors.darkText,
    darkText: Colors.darkText,
    lightText: Colors.lightText,
    overlay: Colors.overlay,
    shadow: Colors.lightShadow,
    primary: Colors.primary,
    primary1: Colors.primary1,
    primary2: Colors.primary2,
    primary3: Colors.primary3,
    primary4: Colors.primary4,
    primary5: Colors.primary5,
    primary6: Colors.primary6,
    primary7: Colors.primary7,
    primary8: Colors.primary8,
    black: Colors.black,
    black1: Colors.black1,
    black2: Colors.black2,
    black3: Colors.black3,
    black4: Colors.black4,
    black5: Colors.black5,
    black6: Colors.black6,
    black7: Colors.black7,
    black8: Colors.black8,
    black9: Colors.black9,
    error: Colors.error,
  },
  spacing: {
    none: Spacing.none,
    hxs: Spacing.hxs,
    hs: Spacing.hs,
    hm: Spacing.hm,
    hl: Spacing.hl,
    hxl: Spacing.hxl,
    h2xl: Spacing.h2xl,
    h3xl: Spacing.h3xl,
    h4xl: Spacing.h4xl,
    vxs: Spacing.vxs,
    vs: Spacing.vs,
    vm: Spacing.vm,
    vl: Spacing.vl,
    vxl: Spacing.vxl,
    v2xl: Spacing.v2xl,
    v3xl: Spacing.v3xl,
    v4xl: Spacing.v4xl,
  },
  breakpoints: {},
  textVariants: {
    DisplayLarge: {
      fontFamily: "CairoReg",
      ...fontSizing(FontSize["5xl"]),
      color: "text",
    },
    DisplayMedium: {
      ...fontSizing(FontSize["4xl"]),
      fontFamily: "CairoBold",
      color: "text",
    },
    DisplaySmall: {
      ...fontSizing(FontSize["3xl"]),
      fontFamily: "CairoReg",
      color: "text",
    },
    HeadlineLarge: {
      ...fontSizing(FontSize["2xl"]),
      fontFamily: "CairoBold",
      color: "text",
    },
    HeadlineMedium: {
      ...fontSizing(FontSize.xl),
      fontFamily: "CairoReg",
      color: "text",
    },
    HeadlineSmall: {
      ...fontSizing(FontSize.l),
      fontFamily: "CairoReg",
      color: "text",
    },
    TitleLarge: {
      ...fontSizing(FontSize.m),
      fontFamily: "CairoBold",
      color: "text",
    },
    TitleMedium: {
      ...fontSizing(FontSize.s),
      fontFamily: "CairoMedium",
      letterSpacing: 0.15,
      color: "text",
    },
    TitleSmall: {
      ...fontSizing(FontSize["2xs"]),
      fontFamily: "CairoMedium",
      letterSpacing: 0.1,
      color: "text",
    },
    BodyLarge: {
      ...fontSizing(FontSize.xs),
      fontFamily: "CairoReg",
      letterSpacing: 0.5,
      color: "text",
    },
    BodyMedium: {
      ...fontSizing(FontSize["2xs"]),
      fontFamily: "CairoReg",
      letterSpacing: 0.25,
      color: "text",
    },
    BodySmall: {
      ...fontSizing(FontSize["3xs"]),
      fontFamily: "CairoReg",
      letterSpacing: 0.4,
      color: "text",
    },
    LabelLarge: {
      ...fontSizing(FontSize["2xs"]),
      fontFamily: "CairoMedium",
      letterSpacing: 0.1,
      color: "text",
    },
    LabelMedium: {
      ...fontSizing(FontSize["3xs"]),
      fontFamily: "CairoMedium",
      letterSpacing: 0.5,
      color: "text",
    },
    LabelSmall: {
      ...fontSizing(FontSize["4xs"]),
      fontFamily: "CairoMedium",
      letterSpacing: 0.5,
      color: "text",
    },
  },
  borderRadii: {
    none: Borders.none,
    s: Borders.s,
    m: Borders.m,
    l: Borders.l,
    xl: Borders.xl,
  },
  zIndices: {
    overlay: 1,
    modal: 2,
  },
});

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: Colors.darkBackground,
    secBackground: Colors.darkBackgroundSec,
    text: Colors.lightText,
    shadow: Colors.darkShadow,
  },
};

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const ReText = createText<Theme>();
export default theme;

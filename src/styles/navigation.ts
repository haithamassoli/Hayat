import Colors from "./colors";

export const LightNavigationColors = {
  colors: {
    background: Colors.lightBackground,
    border: Colors.lightBackground,
    card: Colors.lightBackground,
    notification: "rgb(255, 69, 58)",
    primary: Colors.primary,
    text: Colors.darkText,
  },
  dark: false,
};

export const DarkNavigationColors = {
  colors: {
    background: Colors.darkBackground,
    border: Colors.darkBackground,
    card: Colors.darkBackground,
    notification: "rgb(255, 69, 58)",
    primary: Colors.primary,
    text: Colors.lightText,
  },
  dark: true,
};

import { Box, ReText } from "@styles/theme";

const HomeScreen = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ReText variant="DisplayMedium">Home</ReText>
      <ReText variant="BodySmall">Haitham Assoli</ReText>
    </Box>
  );
};

export default HomeScreen;

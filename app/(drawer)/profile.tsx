import { Box, ReText } from "@styles/theme";

const Profile = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ReText variant="DisplayMedium">Profile</ReText>
      <ReText variant="BodySmall">Haitham Assoli</ReText>
    </Box>
  );
};

export default Profile;

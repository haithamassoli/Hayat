import { Box, ReText } from "@styles/theme";
import { Feather } from "@expo/vector-icons";
import { hs, ms } from "@utils/platform";
import Colors from "@styles/colors";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const Header = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="hm"
      paddingVertical="vs"
    >
      <ReText variant="TitleLarge" textAlign="left">
        {title}
      </ReText>
      <TouchableOpacity
        style={{
          flexDirection: "row",
        }}
        onPress={() => router.back()}
      >
        <Feather name="chevron-left" size={ms(24)} color={Colors.secondary} />
        <Feather
          name="chevron-left"
          size={ms(24)}
          color={Colors.secondary}
          style={{
            marginLeft: hs(-12),
          }}
        />
      </TouchableOpacity>
    </Box>
  );
};

export default Header;

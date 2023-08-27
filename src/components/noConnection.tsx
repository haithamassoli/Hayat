import { TouchableOpacity, StyleSheet } from "react-native";
import { hs, ms, vs } from "@utils/platform";
import { Feather } from "@expo/vector-icons";
import { Box, ReText, Theme } from "@styles/theme";
import { useTheme } from "@shopify/restyle";

type Props = {
  refetch?: () => void;
};

const NoConnection = ({ refetch }: Props) => {
  const { colors } = useTheme<Theme>();
  return (
    <Box flex={1} justifyContent={"center"} alignItems={"center"}>
      <ReText variant="DisplaySmall">لا يوجد اتصال بالانترنت</ReText>
      <TouchableOpacity onPress={refetch} style={styles.button}>
        <Feather name="refresh-cw" size={ms(20)} color={colors.text} />
      </TouchableOpacity>
    </Box>
  );
};

export default NoConnection;
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: hs(20),
    paddingVertical: vs(12),
    borderRadius: ms(10),
    marginTop: vs(10),
  },
});

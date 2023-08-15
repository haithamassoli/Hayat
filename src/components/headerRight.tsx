import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@styles/theme";
import { hs, ms } from "@utils/platform";

interface Props {
  onPress: () => void;
}

const HeaderRight = ({ onPress }: Props) => {
  const { colors } = useTheme<Theme>();
  return (
    <Feather
      name="menu"
      size={ms(24)}
      style={{ marginEnd: hs(16) }}
      color={colors.text}
      onPress={onPress}
    />
  );
};

export default HeaderRight;

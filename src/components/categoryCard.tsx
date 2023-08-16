import { TouchableOpacity } from "react-native";
import { Box, ReText } from "@styles/theme";
import { hs, vs } from "@utils/platform";

type Props = {
  onPress: () => void;
  title: string;
};

const CategoryCard = ({ onPress, title }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        width={hs(130)}
        height={vs(40)}
        backgroundColor="ternary"
        justifyContent="center"
        alignItems="center"
        borderRadius="m"
      >
        <ReText
          variant="LabelLarge"
          fontFamily="CairoBold"
          textAlign="center"
          color="lightText"
        >
          {title}
        </ReText>
      </Box>
    </TouchableOpacity>
  );
};

export default CategoryCard;

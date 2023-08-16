import { TouchableOpacity } from "react-native";
import { Box, ReText } from "@styles/theme";
import { ms } from "@utils/platform";
import { Feather } from "@expo/vector-icons";
import { IconSize } from "@styles/size";
import Colors from "@styles/colors";

type Props = {
  onPress: () => void;
  name: string;
  specialty: string;
};

const DoctorCard = ({ onPress, name, specialty }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        width={ms(120)}
        height={ms(120)}
        backgroundColor="ternary"
        justifyContent="center"
        alignItems="center"
        borderRadius="m"
      >
        <Feather name="user" color={Colors.lightText} size={IconSize.xl} />
        <ReText
          variant="LabelLarge"
          fontFamily="CairoBold"
          textAlign="center"
          color="lightText"
        >
          {name}
        </ReText>
        <ReText
          variant="LabelMedium"
          fontFamily="CairoReg"
          textAlign="center"
          color="lightText"
        >
          {specialty}
        </ReText>
      </Box>
    </TouchableOpacity>
  );
};

export default DoctorCard;

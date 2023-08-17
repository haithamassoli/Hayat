import { Box, ReText } from "@styles/theme";
import { hs, ms, vs } from "@utils/platform";
import { Feather } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { Card } from "react-native-paper";

type Props = {
  onPress: () => void;
  name: string;
  specialty: string;
};

const InfoCard = ({ onPress, name, specialty }: Props) => {
  return (
    <Card
      onPress={onPress}
      mode="elevated"
      contentStyle={{
        paddingHorizontal: hs(16),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: vs(16),
        height: vs(66),
      }}
    >
      <Box>
        <ReText
          variant="BodyMedium"
          fontFamily="CairoBold"
          textAlign="left"
          color="ternary"
        >
          {name}
        </ReText>
        <ReText
          variant="BodyMedium"
          fontFamily="CairoReg"
          textAlign="left"
          color="ternary"
        >
          {specialty}
        </ReText>
      </Box>
      <Feather name="user" color={Colors.ternary} size={ms(38)} />
    </Card>
  );
};

export default InfoCard;

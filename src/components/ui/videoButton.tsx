import { Feather } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { Box, ReText } from "@styles/theme";
import { ms, vs } from "@utils/platform";
import { Button } from "react-native-paper";

const VideoButton = ({
  onPress,
  title,
  mode = "elevated",
  style,
  duration,
}: {
  onPress: () => void;
  title: string;
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  style?: any;
  duration: string;
}) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      contentStyle={{
        height: vs(48),
        paddingTop: vs(4),
      }}
      style={{
        ...style,
      }}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box flexDirection="row" alignItems="center" gap="hs">
          <Feather name="play-circle" size={ms(20)} color={Colors.secondary} />
          <ReText variant="LabelLarge">{title}</ReText>
        </Box>
        <ReText variant="LabelLarge">{duration}</ReText>
      </Box>
    </Button>
  );
};

export default VideoButton;

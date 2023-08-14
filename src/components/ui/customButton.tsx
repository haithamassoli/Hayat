import { vs } from "@utils/platform";
import { Button } from "react-native-paper";

const CustomButton = ({
  onPress,
  title,
  mode = "contained",
  style,
}: {
  onPress: () => void;
  title: string;
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  style?: any;
}) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      contentStyle={{
        height: vs(46),
      }}
      style={{
        ...style,
      }}
    >
      {title}
    </Button>
  );
};

export default CustomButton;

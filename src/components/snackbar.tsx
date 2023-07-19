import { Box } from "@styles/theme";
import { useStore } from "@zustand/store";
import { useEffect, useState } from "react";
import { Snackbar as PSnackbar } from "react-native-paper";

const Snackbar = () => {
  // const { snackbarText, setSnackbarText } = useStore((state) => state);
  const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   if (snackbarText) {
  //     setVisible(true);
  //   }
  // }, [snackbarText]);

  // const onDismiss = () => {
  //   setVisible(false);
  //   setSnackbarText("");
  // };
  return (
    <Box
      flex={1}
      position="absolute"
      zIndex="overlay"
      bottom={0}
      width={"100%"}
    >
      <PSnackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        // onDismiss={onDismiss}
        duration={5000}
        action={{
          label: "حسناً",
          // onPress: onDismiss,
        }}
      >
        {/* {snackbarText} */}
      </PSnackbar>
    </Box>
  );
};

export default Snackbar;

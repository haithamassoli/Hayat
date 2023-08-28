import { Feather, Ionicons } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { IconSize } from "@styles/size";
import { Box, ReText, Theme } from "@styles/theme";
import { router } from "expo-router";
import { TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vs } from "@utils/platform";
import ControlledInput from "@components/ui/controlledInput";
import { useTheme } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import Snackbar from "@components/snackbar";
import { type ValidationSchemaType, validationSchema } from "@src/types/schema";
import { useEffect, useState } from "react";
import { googleLoginMutation, registerMutation } from "@apis/auth";
import Loading from "@components/loading";
import CustomButton from "@components/ui/customButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "@zustand/store";
import { useNetInfo } from "@react-native-community/netinfo";
import { useAuthRequest } from "expo-auth-session/providers/google";

const SingUp = () => {
  const { isConnected } = useNetInfo();
  const { colors } = useTheme<Theme>();
  const { control, handleSubmit } = useForm<ValidationSchemaType>({
    resolver: zodResolver(validationSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const [request, response, promptAsync] = useAuthRequest({
    androidClientId:
      "931682740672-ntjke6ff74smt82i5q4id66g8j25vj20.apps.googleusercontent.com",
  });

  const { mutate, isLoading } = registerMutation();
  const { mutate: googleLogin, isLoading: googleLoading } =
    googleLoginMutation();

  const onSubmit = (data: ValidationSchemaType) => {
    mutate(data);
  };

  const onEyePress = () => {
    setShowPassword((e) => !e);
  };

  const handleEffect = () => {
    if (isConnected === false)
      return useStore.setState({
        snackbarText: "لا يوجد اتصال بالإنترنت",
      });
    if (response?.type === "success") {
      const { id_token } = response.params;
      googleLogin(id_token);
    }
  };

  useEffect(() => {
    handleEffect();
  }, [response]);

  if (isLoading || googleLoading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Snackbar />
      <Box flex={1} paddingHorizontal="hl" paddingTop="vl">
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Feather name="x" size={IconSize.l} color={colors.text} />
        </TouchableOpacity>
        <Box flex={1}>
          <Box height={"25%"} justifyContent="center" alignItems="center">
            <Feather name="user" color={Colors.primary} size={IconSize.xl} />
            <ReText variant="DisplaySmall">تسجيل حساب جديد</ReText>
          </Box>
          <Box height={vs(64)} />
          <ControlledInput
            control={control}
            name="email"
            label={"البريد الإلكتروني"}
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            style={{
              width: "100%",
              fontFamily: "CairoReg",
            }}
          />
          <ControlledInput
            control={control}
            name="password"
            textContentType="password"
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={onEyePress}
              />
            }
            label={"كلمة المرور"}
            style={{ width: "100%", fontFamily: "CairoReg" }}
          />
          <Box height={vs(32)} />
          <CustomButton
            mode="contained-tonal"
            onPress={handleSubmit(onSubmit)}
            title="تسجيل"
          />
          <TouchableOpacity onPress={() => router.push("/sign-in")}>
            <ReText
              marginTop="hm"
              marginHorizontal="hs"
              textAlign="left"
              variant="BodySmall"
            >
              لديك حساب؟ تسجيل الدخول
            </ReText>
          </TouchableOpacity>
          <ReText
            marginVertical="vl"
            textAlign="center"
            variant="LabelLarge"
            fontFamily="CairoBold"
          >
            أو
          </ReText>
          <Box
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap="hl"
          >
            <TouchableOpacity onPress={() => promptAsync()}>
              <Ionicons
                name="logo-google"
                size={IconSize.l}
                color={Colors.primary}
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default SingUp;

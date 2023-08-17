import { Feather } from "@expo/vector-icons";
import Colors from "@styles/colors";
import { IconSize } from "@styles/size";
import { Box, ReText, Theme } from "@styles/theme";
import { useRouter } from "expo-router";
import { TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vs } from "@utils/platform";
import ControlledInput from "@components/ui/controlledInput";
import { useTheme } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import Snackbar from "@components/snackbar";
import { useState } from "react";
import { type ValidationSchemaType, validationSchema } from "@src/types/schema";
import Loading from "@components/loading";
import { loginMutation } from "@apis/auth";
import CustomButton from "@components/ui/customButton";

const SignIn = () => {
  const router = useRouter();
  const { colors } = useTheme<Theme>();
  const { control, handleSubmit } = useForm<ValidationSchemaType>({
    resolver: zodResolver(validationSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isLoading } = loginMutation();

  const onSubmit = (data: ValidationSchemaType) => {
    mutate(data);
  };

  const onEyePress = () => {
    setShowPassword((e) => !e);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Snackbar />
      <Box flex={1} paddingHorizontal="hl" paddingTop="vl">
        <Feather
          name="x"
          size={IconSize.l}
          color={colors.text}
          onPress={() => router.replace("/")}
        />
        <Box flex={1}>
          <Box height={"25%"} justifyContent="center" alignItems="center">
            <Feather name="user" color={Colors.primary} size={IconSize.xl} />
            <ReText variant="DisplaySmall">تسجيل الدخول</ReText>
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
            title="تسجيل الدخول"
          />
          <TouchableOpacity onPress={() => router.push("sign-up")}>
            <ReText
              marginTop="hm"
              marginHorizontal="hs"
              textAlign="left"
              variant="BodySmall"
            >
              ليس لديك حساب؟ سجل الآن
            </ReText>
          </TouchableOpacity>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;

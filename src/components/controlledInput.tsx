import { Controller, Control } from "react-hook-form";
import { TextInput, HelperText } from "react-native-paper";

type ControlledInputProps = {
  control: Control<any>;
  name: string;
  width?: string | number;
} & React.ComponentProps<typeof TextInput>;

const ControlledInput = ({
  control,
  name,
  width,
  ...textInputProps
}: ControlledInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error, invalid },
      }) => (
        <>
          <TextInput
            {...textInputProps}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={invalid}
          />
          <HelperText
            type="error"
            visible={invalid}
            style={{
              fontFamily: "CairoReg",
              textAlign: "left",
              width: width || "86%",
            }}
          >
            {error?.message}
          </HelperText>
        </>
      )}
    />
  );
};

export default ControlledInput;

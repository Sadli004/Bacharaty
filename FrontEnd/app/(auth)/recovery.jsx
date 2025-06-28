import { SafeAreaView, Text, TextInput, View } from "react-native";
import { useRef, useState } from "react";
import FormField from "../../components/formField";
import CustomButton from "../../components/customButton";

const PasswordRecovery = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (text && index === 5) {
      inputsRef.current[index]?.blur();
    }
  };
  return (
    <SafeAreaView className="h-full bg-background-light ">
      <View className="min-h-[80vh] items-center justify-center mx-2">
        {step == 1 && (
          <>
            <View className="items-center">
              <Text className="text-3xl font-psemibold">
                Forgot your password?
              </Text>
              <Text className="text-center text-lg font-pregular">
                Reset your password and access your personal account login
              </Text>
            </View>
            <FormField
              title="Email"
              placeholder="Enter your email"
              containerStyles="my-6"
            />
            <CustomButton
              title="Next"
              containerStyles="w-full"
              handlePress={() => setStep(2)}
            />
          </>
        )}
        {step == 2 && (
          <>
            <View className="items-center">
              <Text className="text-xl font-psemibold ">Verification Code</Text>
              <Text className="text-lg font-pregular text-center">
                We have sent the OTP code to your email for the verification
                process
              </Text>
            </View>

            <View className="flex-row justify-between mt-8 mb-4 space-x-2">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputsRef.current[index] = ref)}
                  className="w-12 h-14 rounded-xl bg-white text-center text-xl font-bold text-black shadow-md"
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  autoFocus={index === 0}
                />
              ))}
            </View>
            <CustomButton
              title="Confirm"
              containerStyles="w-full"
              handlePress={() => setStep(3)}
            />
          </>
        )}
        {step == 3 && (
          <>
            <View>
              <Text className="text-xl font-psemibold">
                Reset your password
              </Text>
            </View>
            <View>
              <FormField placeholder="Enter your new password" />
              <FormField placeholder="Confirm password" />
            </View>
            <CustomButton title="Change password" containerStyles="w-full" />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PasswordRecovery;

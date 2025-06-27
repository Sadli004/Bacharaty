import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function OTP() {
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

  const handleContinue = () => {
    const code = otp.join("");
    if (code.length !== 6) {
      alert("Please enter the 6-digit code.");
    } else {
      console.log("Code submitted:", code);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFF]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 items-center justify-center px-6"
      >
        <Text className="text-[28px] font-semibold text-black">
          Verify <Text className="italic text-[#1D4ED8]">your email</Text>
        </Text>

        <Text className="text-center text-sm text-gray-500 mt-2">
          Enter code we’ve sent to your inbox{"\n"}
          <Text className="text-black font-semibold">
            hello@designme.agency
          </Text>
        </Text>

        {/* OTP Inputs */}
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

        <TouchableOpacity>
          <Text className="text-sm text-gray-500 mb-6">
            Didn’t get the code?{" "}
            <Text className="text-blue-600 font-semibold">Resend it.</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-600 w-full py-4 rounded-xl items-center"
          onPress={handleContinue}
        >
          <Text className="text-white font-semibold text-base">Continue</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

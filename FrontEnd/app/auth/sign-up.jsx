import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import FormField from "../../components/formField";
import CustomButton from "../../components/customButton";
import { Link, router } from "expo-router";
import { icons } from "../../constants";
import { DismissKeyboard } from "../../utils/keyboard";
import { useUserStore } from "../../store/userStore";
const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { registre } = useUserStore();
  return (
    <SafeAreaView className="bg-[#f9f9f9] ">
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="w-full min-h-[90vh] justify-center px-6 my-6">
            <Text className="font-psemibold text-3xl align-left">
              Create an account
            </Text>
            <DismissKeyboard>
              <View className="w-full px-2 mt-10 ">
                <FormField
                  title="First name"
                  placeholder="First name"
                  containerStyles="shadow-md"
                  handleChange={(e) => {
                    setForm({ ...form, firstName: e });
                  }}
                  otherStyles="bg-white"
                />
                <FormField
                  title="Last name"
                  placeholder="Last name"
                  containerStyles="shadow-md  mt-2"
                  handleChange={(e) => {
                    setForm({ ...form, lastName: e });
                  }}
                  otherStyles="bg-white"
                />
                <FormField
                  title="Email"
                  placeholder="Email"
                  keyboardType="email-address"
                  containerStyles="shadow-md mt-2"
                  handleChange={(e) => {
                    setForm({ ...form, email: e });
                  }}
                  otherStyles="mt-7 bg-white"
                />
                <FormField
                  title="Password"
                  placeholder="Password"
                  type="password"
                  containerStyles="shadow-md mt-2"
                  handleChange={(e) => {
                    setForm({ ...form, password: e });
                  }}
                  otherStyles="mt-7 bg-white"
                  secureTextEntry
                />
                <CustomButton
                  title="Sign Up"
                  handlePress={() => {
                    registre(form);
                  }}
                  containerStyles="mt-10"
                />
              </View>
            </DismissKeyboard>
            {/* <View className="mt-7 items-center">
            <View className="flex-1 h-px bg-gray" />
            <Text className="text-gray-500 text-center font-pregular mb-4">
              Or{" "}
            </Text>
            <View className="flex-1 h-px bg-gray" />
            <View className=" gap-8 w-[90%]">
              <TouchableOpacity className=" border border-gray shadow-md items-center justify-center flex-row rounded-3xl py-2 px-4">
                <Image
                  source={icons.google}
                  resizeMode="contain"
                  className="w-6 h-6 mr-3 self-start"
                />
                <Text className="text-base">Continue with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity className=" border border-gray shadow-md items-center justify-center flex-row rounded-3xl py-2 px-4">
                <Image
                  source={icons.apple}
                  resizeMode="contain"
                  className="w-6 h-6 mr-3 self-start"
                />
                <Text className="text-base">Continue with Apple</Text>
              </TouchableOpacity>
            </View>
          </View> */}
            <Text className="mt-12 text-center font-pregular items-center">
              Already have an account? {""}
              <Pressable onPress={() => router.back()}>
                <Text className="text-primary font-psemibold self-center">
                  Sign In
                </Text>
              </Pressable>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

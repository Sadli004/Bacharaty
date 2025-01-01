import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import FormField from "../../components/formField";
import CustomButton from "../../components/customButton";
import { Link } from "expo-router";
import { icons } from "../../constants";
import { TouchableOpacity } from "react-native";
const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <SafeAreaView className="bg-white ">
      <ScrollView>
        <View className="w-full min-h-[90vh] justify-center px-6 my-6">
          <Text className="font-psemibold text-3xl align-left">
            Create an account
          </Text>
          <View className="w-full px-2 mt-10 ">
            <FormField title="Full name" placeholder="Full name" />
            <FormField
              title="Email"
              placeholder="Email"
              keyboardType="email-address"
              otherStyles="mt-7"
            />
            <FormField
              title="Password"
              placeholder="Password"
              keyboardType="password"
              otherStyles="mt-7"
              secureTextEntry
            />
            <CustomButton
              title="Sign Up"
              handlePress={() => {
                Alert.alert("button was pressed");
              }}
              containerStyles="mt-10"
            />
          </View>
          <View className="mt-7 items-center">
            <Text className="text-gray-500 text-center mb-4 font-pregular">
              Or continue with{" "}
            </Text>
            <View className="flex-row gap-8 ">
              <TouchableOpacity className="border border-gray-400 rounded-md p-2">
                <Image
                  source={icons.google}
                  resizeMode="contain"
                  className="w-10 h-10 "
                />
              </TouchableOpacity>
              <TouchableOpacity className="border border-gray-400 rounded-md p-2">
                <Image
                  source={icons.apple}
                  resizeMode="contain"
                  className="w-10 h-10"
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text className="mt-12 text-center font-pregular">
            Already have an account? {""}
            <Link href="sign-in" className="text-secondary font-psemibold">
              Sign In
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

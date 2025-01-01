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
import { Redirect, router } from "expo-router";
import * as SecureS from "expo-secure-store";
import axios from "axios";
const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSignIn = async () => {
    // e.preventDefault();
    try {
      console.log("Form.email : " + form.email);
      const response = await axios.post(
        "http://192.168.100.241:8082/user/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      console.log("User logged in");
      await SecureS.setItemAsync("token", response.data.accessToken);
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView className="bg-white ">
      <ScrollView>
        <View className="w-full min-h-[90vh] justify-center px-6 my-6">
          <Text className="font-psemibold text-3xl align-left">Hello!</Text>
          <View className="w-full px-2 mt-10">
            <FormField
              title="Email"
              keyboardType="email-address"
              placeholder="Email"
              value={form.email}
              handleChange={(e) => {
                setForm({ ...form, email: e });
              }}
            />
            <FormField
              title="Password"
              keyboardType="password"
              value={form.password}
              placeholder="Password"
              handleChange={(e) => {
                setForm({ ...form, password: e });
              }}
              otherStyles="mt-7"
              secureTextEntry
            />
            <Text className="text-right text-gray-500 font-plight">
              Password recovery
            </Text>
            <CustomButton
              title="Sign In"
              handlePress={handleSignIn}
              containerStyles="mt-7"
            />
          </View>
          <View className="mt-7 items-center">
            <Text className="text-gray-500 text-center font-pregular mb-4">
              Or continue with{" "}
            </Text>
            <View className="flex-row gap-8 ">
              <TouchableOpacity>
                <Image
                  source={icons.google}
                  resizeMode="contain"
                  className="w-10 h-10 "
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={icons.apple}
                  resizeMode="contain"
                  className="w-10 h-10"
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text className="mt-12 text-center font-pregular">
            Don't have an account? {""}
            <Link href="sign-up" className="text-secondary font-psemibold">
              Sign Up
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import FormField from "../../components/formField";
import CustomButton from "../../components/customButton";
import { Link } from "expo-router";
import { icons } from "../../constants";
import { TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import { useUserStore } from "../../store/userStore";
import { useToast } from "react-native-toast-notifications";
import showToast from "../../utils/showToast";
const SignIn = () => {
  const toast = useToast();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { login, user, role } = useUserStore();

  const handleSignIn = async () => {
    login(form.email, form.password).catch((error) => {
      toast.show(error.response.data || "Login error", {
        type: "danger",
        placement: "bottom",
      });
    });
  };
  useEffect(() => {
    if (user) {
      if (role == "Doctor") {
        router.replace("/doctor/dashboard");
      } else router.replace("/patient/home");
    }
  }, [user, role]);
  return (
    <SafeAreaView className="bg-background-light flex-1">
      <ScrollView>
        <View className="w-full min-h-[82vh] justify-center px-6 my-6">
          <Text className="font-psemibold text-3xl align-left">Hello!</Text>
          <View className="w-full px-2 mt-10">
            <FormField
              title="Email"
              keyboardType="email-address"
              placeholder="Email"
              value={form.email}
              containerStyles="shadow-md"
              otherStyles="bg-white"
              handleChange={(e) => {
                setForm({ ...form, email: e });
              }}
            />
            <FormField
              title="Password"
              placeholder="Password"
              containerStyles="mt-2 shadow-md"
              otherStyles="bg-white"
              type="password"
              handleChange={(e) => {
                setForm({ ...form, password: e });
              }}
            />
            <TouchableOpacity onPress={() => router.push("/recovery")}>
              <Text className="text-right text-gray-500 font-plight">
                Password recovery
              </Text>
            </TouchableOpacity>
            <CustomButton
              title="Sign In"
              // handlePress={() => {
              //   router.push("/otp");
              // }}
              handlePress={handleSignIn}
              containerStyles="mt-7 shadow-md"
            />
          </View>
          <View className="mt-7 items-center">
            {/* <View className="flex-1 h-px bg-gray" /> */}
            <Text className="text-gray-500 text-center font-pregular mb-4">
              Or{" "}
            </Text>
            {/* <View className="flex-1 h-px bg-gray" /> */}
            <View className=" gap-8 w-[90%]">
              <TouchableOpacity className=" border border-gray shadow-md  items-center justify-center flex-row rounded-3xl py-2 px-4">
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
          </View>
          <Text className="mt-12 text-center font-pregular">
            Don't have an account? {""}
            <Link href="/sign-up" className=" text-primary font-psemibold">
              Sign Up
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

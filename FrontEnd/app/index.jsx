import { Redirect, router, Stack } from "expo-router";
import { ImageBackground, SafeAreaView, Text, View } from "react-native";
import { images } from "../constants";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/customButton";
import * as SecureS from "expo-secure-store";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
export default function Index() {
  const { isFirstLaunch } = useUserStore();
  const [showOnboarding, setShowOnboarding] = useState(false);
  useEffect(() => {
    const checkFirstLaunch = async () => {
      const value = await SecureS.getItemAsync("firstLaunch");
      if (value === null) {
        setShowOnboarding(true);
        await SecureS.setItemAsync("firstLaunch", "true");
      } else {
        setShowOnboarding(false);
      }
    };
  }, []);
  return (
    <SafeAreaView className="flex h-full items-center justify-between">
      {isFirstLaunch ? (
        <View className="flex h-full items-center justify-between">
          <Text className="text-3xl">OnBoarding screen</Text>
        </View>
      ) : (
        <Text>I'm fucked</Text>
      )}
    </SafeAreaView>
  );
}

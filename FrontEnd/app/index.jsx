import { Redirect, router } from "expo-router";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import * as SecureS from "expo-secure-store";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import OnboardingScreen from "./onBoarding";

export default function Index() {
  const [showOnboarding, setShowOnboarding] = useState(null); // null means unknown
  const { user, loading, role } = useUserStore();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const alreadyLaunched = await SecureS.getItemAsync("alreadyLaunched");
      console.log(alreadyLaunched);
      if (alreadyLaunched === null) {
        await SecureS.setItemAsync("alreadyLaunched", "true");
        setShowOnboarding(true);
      } else {
        await SecureS.deleteItemAsync("alreadyLaunched");
        setShowOnboarding(false);
      }
    };
  }, [loading, user]);

  // While checking
  if (loading || showOnboarding === null) {
    return (
      <View className="h-full flex items-center justify-center bg-white">
        <Text>Loading</Text>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  // Show onboarding
  if (showOnboarding) return <OnboardingScreen />;
  if (!showOnboarding) return <Redirect href="/sign-in" />;
  return (
    <View className="h-full flex items-center justify-center bg-white">
      <Text>Loading</Text>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}

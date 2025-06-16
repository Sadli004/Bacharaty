import { Redirect, router } from "expo-router";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import * as SecureS from "expo-secure-store";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import OnboardingScreen from "./onBoarding";

export default function Index() {
  const [showOnboarding, setShowOnboarding] = useState(null); // null means unknown
  const { user, loading, role, getUser } = useUserStore();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const alreadyLaunched = await SecureS.getItemAsync("alreadyLaunched");
      if (alreadyLaunched === null) {
        await SecureS.setItemAsync("alreadyLaunched", "true");
        setShowOnboarding(true);
      } else {
        setShowOnboarding(false);
        router.replace("sign-in");
      }
    };

    if (!loading && user === null) {
      checkFirstLaunch();
    }

    if (!loading && user !== null) {
      if (role !== "Doctor") {
        router.replace("/patient/magasin");
      } else {
        router.replace("/doctor/dashboard");
      }
    }
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

  return (
    <View className="h-full flex items-center justify-center bg-white">
      <Text>Loading</Text>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}

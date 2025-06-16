import { router, SplashScreen, Stack, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useUserStore } from "../store/userStore";
import { ToastProvider } from "react-native-toast-notifications";
import * as SecureS from "expo-secure-store";
SplashScreen.preventAutoHideAsync();
function RootLayout() {
  // const segments = useSegments();
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
    if (!fontsLoaded && !error) return;
  }, [fontsLoaded, error]);

  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />

        {/* <Stack.Screen name="auth/sign-in" />
        <Stack.Screen name="auth/sign-up" /> */}
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="patient/(tabs)" />
        <Stack.Screen name="doctor" />
      </Stack>
    </ToastProvider>
  );
}
export default RootLayout;

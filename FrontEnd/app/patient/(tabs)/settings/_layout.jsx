import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="Main" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
};

export default SettingsLayout;

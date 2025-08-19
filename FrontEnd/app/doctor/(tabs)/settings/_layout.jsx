import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false,
          headerBackTitle: "Settings",
          title: "",
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
      <Stack.Screen
        name="availability"
        options={{
          headerShown: true,
          headerBackTitle: "Settings",
          title: "Editing Working hours",
          headerStyle: {
            backgroundColor: "#FAFAFA",
          },
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;

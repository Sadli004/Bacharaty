import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const DoctorLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="[chatId]"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#B3E5FC" },
        }}
      />
    </Stack>
  );
};

export default DoctorLayout;

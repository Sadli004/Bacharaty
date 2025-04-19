import { View, Text, Image } from "react-native";
import React from "react";
import { router, Redirect, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { icons } from "../../../constants";

const DoctorsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="doctor/[id]"
        options={{
          headerTitle: "Doctor details",
          headerStyle: {
            backgroundColor: "transparent",
            alignItems: "center",
          },
          headerLeft: () => (
            <TouchableOpacity onPressIn={() => router.back()}>
              <Image
                source={icons.leftArrow}
                resizeMode="contain"
                tintColor="#0CC0DF"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default DoctorsLayout;

import { View, Text, Image, Platform } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { icons } from "../../../constants";
import { TouchableOpacity } from "react-native";

const ProductLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="product/[id]" />
      <Stack.Screen name="wishlist" />
      <Stack.Screen name="cart" />
    </Stack>
  );
};

export default ProductLayout;

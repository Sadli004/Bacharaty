import { View, Text, Image } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { icons } from "../../../constants";
import { TouchableOpacity } from "react-native";

const ProductLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="product/[id]"
        options={{
          headerTitle: "Product Details",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
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

export default ProductLayout;

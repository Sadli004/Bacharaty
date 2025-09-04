import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { useProductStore } from "../store/productStore";

const Counter = ({ count, productId }) => {
  const { updateQuantity } = useProductStore();

  return (
    <View className="  flex-row items-center space-x-2 ">
      <TouchableOpacity
        className={`rounded-sm border border-secondary2 p-1 bg-secondary2`}
        onPress={() => count > 1 && updateQuantity(productId, count - 1)}
      >
        <Image
          source={icons.minus}
          resizeMode="contain"
          tintColor="white"
          className="w-4 h-4 mx-1"
        />
      </TouchableOpacity>
      <Text className="text-lg px-1 text-black">{count}</Text>
      <TouchableOpacity
        className={`rounded-sm border border-secondary2 p-1 bg-secondary2`}
        onPress={() => updateQuantity(productId, count + 1)}
      >
        <Image
          source={icons.plus}
          resizeMode="contain"
          tintColor="white"
          className="w-4 h-4 mx-1"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

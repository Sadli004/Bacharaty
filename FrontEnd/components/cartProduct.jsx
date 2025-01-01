import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Counter from "./quantityCounter";

const CartProduct = ({ item, handlePress }) => {
  const imageUrl =
    "https://cosmeticstoredz.com/wp-content/uploads/2023/12/CC-228.png";
  return (
    <TouchableOpacity
      className="p-4 m-2  rounded-3xl flex-row shadow-sm bg-lgray"
      onPress={handlePress}
      key={item.id}
    >
      <View className="mr-4">
        <Image
          source={{ uri: imageUrl }}
          resizeMode="contain"
          className="h-20 w-20  rounded-lg"
        />
      </View>
      <View className="flex-1">
        <Text className="text-black font-psemibold text-xl">
          {item.product}
        </Text>
        <Text className="text-sm  font-pregular">Brand</Text>
        <View className="flex-row justify-between ">
          <Text className="text-xl text-primary font-psemibold">400DZD</Text>

          <Counter />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartProduct;

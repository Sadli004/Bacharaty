import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Counter from "./quantityCounter";

const CartProduct = ({ item, handlePress }) => {
  const imageUrl =
    "https://cosmeticstoredz.com/wp-content/uploads/2023/12/CC-228.png";
  return (
    <TouchableOpacity
      className="p-4 m-2  rounded-3xl flex-row shadow-sm bg-gray-light h-[130px]"
      onPress={handlePress}
      key={item?._id}
    >
      <View className="mr-4">
        <Image
          source={{ uri: item.product?.picture || imageUrl }}
          resizeMode="contain"
          className="h-20 w-20  rounded-lg bg-white"
        />
      </View>
      <View className="flex-1">
        <Text className="text-black font-psemibold text-lg">
          {item?.product?.name}
        </Text>
        <Text className="text-sm  font-pregular">{item?.product?.brand}</Text>
        <View className="flex-row justify-between ">
          <Text className="text-xl text-primary font-psemibold">
            {item?.product?.price}
          </Text>

          <Counter count={item?.quantity} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartProduct;

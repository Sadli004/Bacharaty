import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Counter from "./quantityCounter";
import { useProductStore } from "../store/productStore";

const CartProduct = ({ item, handlePress }) => {
  // const {product} = useProductStore();
  const imageUrl =
    "https://cosmeticstoredz.com/wp-content/uploads/2023/12/CC-228.png";
  return (
    <TouchableOpacity
      className="p-4 m-2  rounded-3xl flex-row shadow-sm bg-lgray h-[130px]"
      onPress={handlePress}
      key={item._id}
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
          {item.product.name}
        </Text>
        <Text className="text-sm  font-pregular">{item.product.brand}</Text>
        <View className="flex-row justify-between ">
          <Text className="text-xl text-primary font-psemibold">
            {item.product.price}
          </Text>

          <Counter count={item.quantity} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartProduct;

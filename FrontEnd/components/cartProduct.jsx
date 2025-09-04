import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Counter from "./quantityCounter";
import { icons } from "../constants";
import { Icon } from "./icon";
import { useProductStore } from "../store/productStore";

const CartProduct = ({ item, handlePress }) => {
  const { removeCartItem } = useProductStore();
  const imageUrl =
    "https://cosmeticstoredz.com/wp-content/uploads/2023/12/CC-228.png";
  return (
    <TouchableOpacity
      className="p-4 m-2  rounded-3xl flex-row shadow-sm bg-gray-light min-h-[130px] flex-1"
      onPress={handlePress}
      // key={item?._id}
    >
      <View className="mr-4">
        <Image
          source={{ uri: item.product?.picture || imageUrl }}
          resizeMode="contain"
          className="h-20 w-20  rounded-lg bg-white"
        />
      </View>
      <View className="flex-1">
        <Text
          className="text-black font-pregular text-lg"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item?.product?.name}
        </Text>
        <Text className="text-sm  font-pregular">{item?.product?.brand}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-xl text-black font-pbold">
            {item?.product?.price}
          </Text>

          <View className={`flex-row items-center`}>
            <Counter count={item?.quantity} productId={item?.product?._id} />
            {/* <Icon
              onPress={() => removeCartItem(item?.product?._id)}
              source={icons.trash}
              tintColor={"red"}
              style={`w-6 h-6 ml-3`}
              resizeMode="contain"
            /> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartProduct;

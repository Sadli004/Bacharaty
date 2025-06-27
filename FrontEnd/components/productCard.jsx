import { View, Text, Image, ImageBackground, Alert } from "react-native";
import React, { useState } from "react";
import { images, icons } from "../constants";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useProductStore } from "../store/productStore";
import { useUserStore } from "../store/userStore";

const ProductCard = ({ item }) => {
  const { getSingleProduct, likeProduct, addToCart, unlikeProduct, wishlist } =
    useProductStore();
  const { user } = useUserStore();
  const imageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW674mm7aoc6mLqkJR7ISwbc2pEPApLNt69g&s";

  return (
    <TouchableOpacity
      className="w-[45%] m-2 border border-light rounded-xl overflow-hidden shadow-md bg-white p-1"
      onPress={() => {
        // getSingleProduct(item._id);
        router.push(`patient/product/${item._id}`);
      }}
    >
      {/* Product Image as Background */}
      <View className="relative h-[160px] rounded-xl overflow-hidden border border-lactive shadow-sm">
        <Image
          source={{ uri: item.picture || imageUrl }}
          resizeMode="contain"
          className="absolute w-full h-full bg-white"
        />

        {/* Wishlist Button */}
        <TouchableOpacity
          className="absolute top-2 right-2  p-1 bg-transparent shadow-md"
          onPress={() => {
            !user?.liked.includes(item._id)
              ? likeProduct(item._id)
              : unlikeProduct(item._id);
          }}
        >
          {user?.liked.includes(item._id) ? (
            <Image
              source={icons.heart_filled}
              className="h-6 w-6"
              tintColor="red"
            />
          ) : (
            <Image source={icons.heart} className="h-6 w-6" tintColor="black" />
          )}
        </TouchableOpacity>
      </View>

      {/* Product Details */}
      <View className="p-3 bg-white">
        <Text className="text-black font-semibold text-base">{item?.name}</Text>
        <Text className="text-sm text-gray-500">{item?.brand}</Text>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-lg font-bold text-primary">{item?.price}</Text>

          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={() => {
              addToCart(item?._id);
            }}
          >
            <Image
              source={icons.cart}
              className="h-7 w-7"
              tintColor="#0CC0DF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

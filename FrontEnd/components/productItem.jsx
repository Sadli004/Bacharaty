import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacityBase,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { TouchableOpacity } from "react-native";
import CustomButton from "./customButton";
import Counter from "./quantityCounter";
import { useProductStore } from "../store/productStore";
import { useUserStore } from "../store/userStore";
const ProductItem = () => {
  const { product, likeProduct, cart } = useProductStore();
  const { user } = useUserStore();
  const imageUrl =
    "https://cosmeticstoredz.com/wp-content/uploads/2023/12/Ajouter-un-titre-2024-08-08T121247.732.png";
  function existsinCart(productId) {
    return cart.some((item) => item.product._id === productId);
  }
  return (
    <SafeAreaView className=" rounded-lg   shadow h-full flex-1 ">
      <View className=" flex-1 relative  ">
        <Image
          source={{ uri: product.picture || imageUrl }}
          resizeMode="contain"
          className="h-[60%] w-full bg-white"
        />
      </View>

      <View className=" absolute bottom-0 left-0 right-0 rounded-t-3xl bg-[#f9f9f9] shadow p-6  ">
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl font-psemibold">{product.name}</Text>
          <TouchableOpacity
            onPress={() => {
              likeProduct(product._id);
            }}
          >
            <Image
              source={
                user.liked.includes(product._id)
                  ? icons.heart_filled
                  : icons.heart
              }
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-xl text-gray-600 mt-4">
            {product.description}
          </Text>
        </View>
        <View className="mt-4 ">
          <View className="flex-row items-center">
            <Image
              source={icons.star}
              resizeMode="contain"
              className="h-6 w-6"
            />
            <Image
              source={icons.star}
              resizeMode="contain"
              className="h-6 w-6"
            />
            <Image
              source={icons.star}
              resizeMode="contain"
              className="h-6 w-6"
            />
            <Image
              source={icons.star}
              resizeMode="contain"
              className="h-6 w-6"
            />
          </View>
        </View>
        <View className="mt-4 flex-row justify-between items-center">
          <Text className="font-psemibold text-xl">{product.price} DA</Text>
          {/* <Counter /> */}
        </View>

        <View className="flex-row items-center mt-6 mb-2">
          {/* <CustomButton
            title="Add to cart"
            icon={icons.cart}
            containerStyles="bg-white border border-primary mr-4"
          /> */}
          <CustomButton
            title={existsinCart(product._id) ? "Go to cart" : "Add to cart"}
            containerStyles="flex-1 rounded-3xl text-primary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductItem;

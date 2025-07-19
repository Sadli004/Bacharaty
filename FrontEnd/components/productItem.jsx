import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { icons, images } from "../constants";
import { TouchableOpacity } from "react-native";
import CustomButton from "./customButton";

import { useProductStore } from "../store/productStore";
import { useUserStore } from "../store/userStore";
import { router, useLocalSearchParams } from "expo-router";
const ProductItem = () => {
  const {
    product,
    likeProduct,
    cart,
    addToCart,
    getCart,
    getSingleProduct,
    clearProduct,
    getWishlist,
  } = useProductStore();
  const { id } = useLocalSearchParams();
  const { user } = useUserStore();

  function existsinCart(productId) {
    return cart?.some((item) => item?.product?._id === productId);
  }
  useEffect(() => {
    getSingleProduct(id);
    getCart();

    return () => {
      clearProduct();
    };
  }, []);
  return (
    <SafeAreaView className="  rounded-lg   flex-1 bg-background-light">
      <ScrollView>
        <Image
          source={{ uri: product.picture }}
          resizeMode="contain"
          className="h-[50vh] w-full bg-white"
        />

        <View className=" border border-gray-light rounded-t-3xl  bg-background-light shadow shadow-xl p-6  flex-1 ">
          <View className="flex-row  items-center justify-between">
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
        </View>
      </ScrollView>
      <View className="flex-row items-center mx-2  mb-2">
        <CustomButton
          // title={existsinCart(product._id) ? "Go to cart" : "Add to cart"}
          title="Cart"
          containerStyles=" rounded-3xl bg-white w-[35vw] mr-2 border border-primary"
          textStyles="text-primary"
          handlePress={() => {
            // existsinCart(product._id)
            //   ? router.push("patient/cart")
            //   : addToCart(product._id);
            addToCart(product._id);
          }}
        />
        <CustomButton
          title="Buy now"
          containerStyles="flex-1 rounded-3xl  w-[35vw]"
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductItem;

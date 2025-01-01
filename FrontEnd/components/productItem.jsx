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
const ProductItem = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const imageUrl =
    "https://cosmeticstoredz.com/wp-content/uploads/2023/12/CC-228.png";
  return (
    <SafeAreaView className=" rounded-lg   shadow h-full flex-1 ">
      <View className=" flex-1 relative  ">
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover"
          className="h-[60%] w-full "
        />
      </View>

      <View className=" absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white shadow p-6  ">
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl font-psemibold">Shampoo</Text>
          <TouchableOpacity
            onPress={() => {
              setIsLiked(!isLiked);
            }}
          >
            <Image
              source={isLiked ? icons.heart_filled : icons.heart}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-xl text-gray-600 mt-4">
            A fresh and hydrating shampoo that helps to remove dead skin cells.
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
          <Text className="font-psemibold text-xl">400DZD</Text>
          <Counter />
        </View>

        <View className="flex-row items-center mt-6 mb-2">
          <CustomButton
            title="Add to cart"
            icon={icons.cart}
            containerStyles="bg-white border border-primary mr-4"
          />
          <CustomButton title="Buy" containerStyles="flex-1 text-primary" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductItem;

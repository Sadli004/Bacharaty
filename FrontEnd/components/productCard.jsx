import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import { images, icons } from "../constants";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const ProductCard = ({ item }) => {
  const imageUrl =
    "https://cosmeticstoredz.com/wp-content/uploads/2023/12/CC-228.png";
  return (
    <TouchableOpacity
      className=" flex-1 m-2 border border-primary rounded-xl  overflow-hidden shadow-md bg-white"
      onPress={() => router.push("product/[id]")}
    >
      <View className=" h-[120px] bg-gray-200 m-0.5  rounded-lg bg-primary">
        <TouchableOpacity className="absolute top-0 right-0 z-10">
          <Image
            source={icons.heart}
            className="m-2 h-7 w-7 "
            tintColor="black"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover" // Ensure the image covers the area
          className="w-full h-full rounded-lg "
        />
      </View>
      <View className="m-2">
        <Text className="text-black font-psemibold text-xl">{item.name}</Text>
        <Text className="text-sm text-gray font-pregular">
          {item.brand ?? "Brand"}
        </Text>
        <View className="flex-row justify-between ">
          <Text className="text-lg">{item.price}</Text>
          <TouchableOpacity onPress={() => router.push("cart")}>
            <Image
              source={icons.cart}
              tintColor="#0CC0DF"
              resizeMode="contain"
              className="h-7 w-7"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

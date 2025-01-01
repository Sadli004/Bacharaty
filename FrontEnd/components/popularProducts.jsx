import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { images } from "../constants";

const PopularProducts = () => {
  return (
    <FlatList
      data={[{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }]}
      renderItem={({ item }) => (
        <View className="items-center border h-28 border-primary w-[90vw] m-2 h-[150px]">
          <Image
            source={images.sales}
            resizeMode="cover"
            className=" h-full  w-full"
          />
        </View>
      )}
      keyExtractor={(item) => item.id}
      horizontal
      ListEmptyComponent={
        <View className="items-center p-2 bg-white-200 border rounded-lg border-primary w-[80vw] "></View>
      }
    />
  );
};

export default PopularProducts;

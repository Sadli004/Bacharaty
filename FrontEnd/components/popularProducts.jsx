import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { images } from "../constants";

const PopularProducts = ({ offers = [{ id: 1 }, { id: 2 }] }) => {
  return (
    <FlatList
      data={offers} // Pass offers dynamically
      horizontal
      showsHorizontalScrollIndicator={false} // Hide scrollbar for a cleaner look
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="items-center border border-primary rounded-lg overflow-hidden h-[150px] w-[89vw] mx-2">
          <Image
            source={images.sales} // Dynamic image source
            resizeMode="cover"
            className="w-full h-full"
          />
        </View>
      )}
      ListEmptyComponent={
        <View className="items-center justify-center h-[150px] w-full">
          <Text className="text-gray-500">No offers available</Text>
        </View>
      }
    />
  );
};

export default PopularProducts;

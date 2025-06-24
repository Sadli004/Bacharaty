import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useProductStore } from "../../../store/productStore";
import { icons } from "../../../constants";

export default function Wishlist() {
  const { products } = useProductStore();
  return (
    <SafeAreaView className="bg-background-light h-full">
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View className="flex-row my-2 bg-gray-light rounded-xl p-2 justify-around items-center">
              <View className="flex-row  items-center space-x-4 ">
                <Image
                  source={{ uri: item.picture }}
                  resizeMode="contain"
                  className="h-[120px] w-[120px] bg-white rounded-xl"
                />
                <View>
                  <Text className="text-lg font-psemibold text-base w-[40vw]">
                    {item.name}
                  </Text>
                  <Text className="text-sm">{item.brand}</Text>
                  <Text className="text-lg font-psemibold">{item.price}</Text>
                  <TouchableOpacity className="flex-row bg-primary p-2 rounded-xl items-center">
                    <Image
                      source={icons.cart}
                      resizeMode="contain"
                      tintColor="white"
                      className="h-6 w-6"
                    />
                    <Text className="text-white">Add to cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View className="flex justify-around  space-y-6">
                <Image
                  source={icons.heart}
                  resizeMode="contain"
                  className="h-6 w-6"
                />
                <Image
                  source={icons.cart}
                  resizeMode="contain"
                  className="h-6 w-6"
                />
              </View> */}
            </View>
          );
        }}
        contentContainerStyle={{
          padding: 5,
          marginHorizontal: 5,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

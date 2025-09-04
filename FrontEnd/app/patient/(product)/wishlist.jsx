import {
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useProductStore } from "../../../store/productStore";
import { icons } from "../../../constants";
import { router } from "expo-router";
import { Icon } from "../../../components/icon";

export default function Wishlist() {
  const { getWishlist, wishlist, addToCart } = useProductStore();

  const isAndroid = Platform.OS == "android";
  const statusBarHeight = StatusBar.currentHeight;
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(false);
  useEffect(() => {
    getWishlist();
  }, []);
  return (
    <SafeAreaView
      className="bg-background-light h-full"
      style={{ paddingTop: isAndroid ? statusBarHeight : 0 }}
    >
      <View className="flex-row w-full items-center justify-between p-2  bg-transparent mb-4">
        <Icon
          source={icons.leftArrow}
          resizeMode="contain"
          tintColor={"black"}
          style="w-6 h-6 "
          onPress={() => router.back()}
        />

        <Text className="text-lg font-pregular">Whishlist</Text>
        <Icon
          source={icons.trash}
          resizeMode="contain"
          style="w-6 h-6 "
          tintColor={"red"}
          onPress={() => setDeleteMode((previous) => !previous)}
        />
      </View>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View className={`flex-row items-center gap-2`}>
              <TouchableOpacity
                onPress={() => {
                  router.push(`patient/product/${item._id}`);
                }}
                className="flex-1 flex-row my-2 bg-gray-light rounded-xl p-2 justify-around items-center"
              >
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
                    <TouchableOpacity
                      onPress={() => {
                        addToCart(item._id);
                      }}
                      className="flex-row bg-primary p-2 rounded-xl items-center"
                    >
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
              </TouchableOpacity>
              {deleteMode && (
                <Pressable onPress={() => setDeleteSelected(!deleteSelected)}>
                  {deleteSelected ? (
                    <Image source={icons.checkmark} className={`w-6 h-6`} />
                  ) : (
                    <View
                      className={`rounded-full p-1 bg-transparent border h-6 w-6 mr-2`}
                    ></View>
                  )}
                </Pressable>
              )}
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

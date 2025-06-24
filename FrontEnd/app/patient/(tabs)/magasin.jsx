import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchInput from "../../../components/searchInput";
import PopularProducts from "../../../components/popularProducts";
import ProductCard from "../../../components/productCard";
import Categories from "../../../components/categories";
import * as ExpStatusBar from "expo-status-bar";
import { useProductStore } from "../../../store/productStore";
import { DismissKeyboard } from "../../../utils/keyboard";
import { useUserStore } from "../../../store/userStore";
import { icons } from "../../../constants";
import { router } from "expo-router";
const Magasin = () => {
  const { products, fetchProducts, loadingProducts } = useProductStore();
  const { user } = useUserStore();
  const isAndroid = Platform.OS == "android";
  const statusBarHeight = StatusBar.currentHeight;
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView
      className=" flex-1 bg-background-light"
      style={{ paddingTop: isAndroid ? statusBarHeight : 0 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {!loadingProducts ? (
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            numColumns={2}
            renderItem={({ item }) => <ProductCard item={item} />}
            ListEmptyComponent={
              <View className="items-center justify-center h-full ">
                <Text className="font-pbold text-xl">No items listed yet</Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => {
              return (
                <View
                  className="bg-transparent" /*transparent*/
                  style={{ paddingTop: isAndroid ? statusBarHeight : 0 }}
                >
                  {/*Header */}
                  <View className="flex-row justify-between mx-2">
                    <Text className="font-psemibold text-lg ">
                      Start shopping
                    </Text>
                    <View className="flex-row items-center gap-4">
                      <TouchableOpacity
                        onPress={() => {
                          router.push("patient/(product)/wishlist");
                        }}
                      >
                        <Image
                          source={icons.heart}
                          resizeMode="contain"
                          className="h-6 w-6"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          router.push("patient/(product)/cart");
                        }}
                      >
                        <Image
                          source={icons.cart}
                          resizeMode="contain"
                          className="h-6 w-6"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/*Search Bar*/}
                  <View className="m-2">
                    <DismissKeyboard>
                      <SearchInput otherStyles=" rounded-3xl bg-background-light border-gray-light focus:border-dactive" />
                    </DismissKeyboard>
                  </View>
                  <View>
                    <View className=" m-4">
                      <PopularProducts />
                    </View>
                    <Categories />
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <ActivityIndicator color="black" />
        )}
      </KeyboardAvoidingView>
      <ExpStatusBar.StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Magasin;

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
import { useColorScheme } from "nativewind";
import IconButton from "../../../components/iconButton";
const Magasin = () => {
  const { products, fetchProducts, loadingProducts, getWishlist } =
    useProductStore();
  const { user } = useUserStore();
  const isAndroid = Platform.OS == "android";
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme == "dark";
  const statusBarHeight = StatusBar.currentHeight;
  useEffect(() => {
    fetchProducts();
    getWishlist();
  }, []);

  return (
    <SafeAreaView
      className={` flex-1 ${
        isDark ? "bg-background-dark" : "bg-background-light"
      }`}
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
                <Text
                  className={`font-pbold text-xl ${isDark && "text-white"}`}
                >
                  No items listed yet
                </Text>
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
                    <Text
                      className={`font-psemibold text-lg ${
                        isDark && "text-white"
                      }`}
                    >
                      Start shopping
                    </Text>
                    <View className="flex-row items-center ">
                      <IconButton
                        Icon={icons.cart}
                        handlePress={() => {
                          router.push("patient/(product)/cart");
                        }}
                        buttonStyles={"mr-4"}
                        iconStyles={"h-6 w-6"}
                        tintColor={isDark && "white"}
                      />
                      <IconButton
                        Icon={icons.heart}
                        handlePress={() => {
                          router.push("patient/(product)/wishlist");
                        }}
                        iconStyles={"h-6 w-6"}
                        tintColor={isDark && "white"}
                      />
                    </View>
                  </View>
                  {/*Search Bar*/}
                  <View className="m-2">
                    <DismissKeyboard>
                      <SearchInput
                        otherStyles={` rounded-3xl ${
                          isDark
                            ? "bg-gray-dark border-gray-light"
                            : "bg-gray-light"
                        } `}
                      />
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

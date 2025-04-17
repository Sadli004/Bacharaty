import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchInput from "../../../components/searchInput";
import PopularProducts from "../../../components/popularProducts";
import ProductCard from "../../../components/productCard";
import Categories from "../../../components/categories";
import { StatusBar } from "expo-status-bar";
import { useProductStore } from "../../../store/productStore";
import { DismissKeyboard } from "../../../utils/keyboard";
import { useUserStore } from "../../../store/userStore";
const Magasin = () => {
  const { products, fetchProducts, loading } = useProductStore();
  const { user } = useUserStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View className=" flex-1 bg-[#f9f9f9]">
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <SafeAreaView className="bg-secondary">
          {/*Header */}
          <View className="flex-row justify-between mx-2">
            <Text className="font-psemibold text-xl">Welcome {user?.name}</Text>
          </View>
          {/*Search Bar*/}
          <View className="mx-2 my-4">
            <DismissKeyboard>
              <SearchInput otherStyles=" rounded-3xl bg-light" />
            </DismissKeyboard>
          </View>
        </SafeAreaView>
        <View>
          <View className=" m-4">
            <PopularProducts />
          </View>
          <Categories />
        </View>
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
        />
      </KeyboardAvoidingView>
      <StatusBar style="dark" />
    </View>
  );
};

export default Magasin;

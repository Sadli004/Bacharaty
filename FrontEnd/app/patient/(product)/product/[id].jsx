import { View, Text, SafeAreaView, Platform, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import ProductItem from "../../../../components/productItem";
import { Icon } from "../../../../components/icon";
import { icons } from "../../../../constants";

const Product = () => {
  const isAndroid = Platform.OS == "android";
  const statusBarHeight = StatusBar.currentHeight;
  return (
    <SafeAreaView
      className={`h-full bg-background-light`}
      style={{ paddingTop: isAndroid ? statusBarHeight : 0 }}
    >
      <View className="flex-row w-full items-center justify-between max-w-[75%]  p-2  bg-transparent mb-2">
        <Icon
          source={icons.leftArrow}
          resizeMode="contain"
          tintColor={"black"}
          style="w-6 h-6 "
          onPress={() => router.back()}
        />

        <Text className="text-lg font-pregular">Product Details</Text>
      </View>
      <ProductItem />
    </SafeAreaView>
  );
};

export default Product;

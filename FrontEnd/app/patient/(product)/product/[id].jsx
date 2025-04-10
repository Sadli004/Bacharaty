import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import ProductItem from "../../../../components/productItem";
import { StatusBar } from "expo-status-bar";

const Product = () => {
  const { id } = useLocalSearchParams();
  return (
    <>
      <ProductItem />
      <StatusBar style="dark" backgroundColor="transparent" />
    </>
  );
};

export default Product;

import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import ProductItem from "../../../components/productItem";
import { StatusBar } from "expo-status-bar";

const Product = () => {
  const { id } = useLocalSearchParams();
  const item = { id: "1", product: "Shampoo" };
  return (
    <>
      <ProductItem item={item} />
      <StatusBar style="dark" backgroundColor="transparent" />
    </>
  );
};

export default Product;

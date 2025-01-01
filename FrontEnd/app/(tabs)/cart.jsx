import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Counter from "../../components/quantityCounter";
import { icons } from "../../constants";
import { router } from "expo-router";
import CustomButton from "../../components/customButton";
import CartProduct from "../../components/cartProduct";

const Cart = () => {
  const productData = [
    {
      id: "1",
      product: "Face Cream",
      price: "$25.00",
      description: "Hydrating face cream with natural ingredients.",
      image: "path/to/face_cream_image.jpg",
    },
    {
      id: "2",
      product: "Hair Serum",
      price: "$30.00",
      description: "Nourishing hair serum for smooth and shiny hair.",
      image: "path/to/hair_serum_image.jpg",
    },
    {
      id: "3",
      product: "Shampoo",
      price: "$15.00",
      description: "Gentle shampoo that cleanses and nourishes.",
      image: "path/to/shampoo_image.jpg",
    },
    {
      id: "4",
      product: "Coconut Oil",
      price: "$10.00",
      description: "Organic coconut oil for cooking and skincare.",
      image: "path/to/coconut_oil_image.jpg",
    },
    {
      id: "5",
      product: "Moisturizing Lotion",
      price: "$20.00",
      description: "Rich moisturizing lotion for all skin types.",
      image: "path/to/moisturizing_lotion_image.jpg",
    },
    {
      id: "6",
      product: "Sunscreen SPF 50",
      price: "$18.00",
      description: "Broad-spectrum sunscreen for ultimate protection.",
      image: "path/to/sunscreen_image.jpg",
    },
    {
      id: "7",
      product: "Lip Balm",
      price: "$5.00",
      description: "Natural lip balm to keep your lips hydrated.",
      image: "path/to/lip_balm_image.jpg",
    },
    {
      id: "8",
      product: "Body Scrub",
      price: "$22.00",
      description: "Exfoliating body scrub for smooth skin.",
      image: "path/to/body_scrub_image.jpg",
    },
  ];
  return (
    <SafeAreaView className=" h-full border-primary bg-white">
      <FlatList
        data={productData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartProduct
            item={item}
            handlePress={() => router.push("product/[id]")}
          />
        )}
        ListEmptyComponent={() => <Text>Empty </Text>}
      />
      <View className=" m-2 rounded-xl border border-primary p-4">
        <View className="flex-row justify-between p-2">
          <Text className="font-psemibold text-xl">Price</Text>
          <Text className="text-lg">4000 DZD</Text>
        </View>
        <View className="flex-row justify-between p-2">
          <Text className="font-psemibold text-xl">Shipping</Text>
          <Text className="text-lg">500 DZD</Text>
        </View>
        <View className="flex-row justify-between p-2">
          <Text className="font-psemibold text-xl">Total</Text>
          <Text className="text-lg">4500 DZD</Text>
        </View>

        <CustomButton title="Checkout" containerStyles="rounded-lg m-2" />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

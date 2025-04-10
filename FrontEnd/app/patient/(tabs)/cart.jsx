import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import CustomButton from "../../../components/customButton";
import CartProduct from "../../../components/cartProduct";
import { useProductStore } from "../../../store/productStore";

const Cart = () => {
  const { getCart, cart, getSingleProduct } = useProductStore();
  const [Price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(40);
  useEffect(() => {
    const countPrice = () => {
      let price = 0;
      for (i = 0; i < cart.length; i++) {
        price = price + cart[i].product.price * cart[i].quantity;
      }
      setPrice(price);
    };

    getCart();
    countPrice();
  }, [Price]);
  return (
    <SafeAreaView className=" h-full border-primary bg-[#f9f9f9]">
      <FlatList
        data={cart}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CartProduct
            item={item}
            handlePress={() => {
              getSingleProduct(item.product._id);
              router.push("patient/product/[id]");
            }}
          />
        )}
        ListEmptyComponent={() => (
          <View className="min-h-[70%] items-center justify-center">
            <Text className="font-pbold text-xl">No items listed yet </Text>
            <CustomButton title="Start shopping" />
          </View>
        )}
        ListFooterComponent={() => {}}
      />
      <View className="bg-lgray shadow-sm  m-2 rounded-3xl  p-4 mb-4">
        <View className="bg-[#f9f9f9] rounded-xl p-2 mb-2">
          <View className="flex-row justify-between p-2">
            <Text className="font-psemibold text-xl">Price</Text>
            <Text className="text-xl font-pbold">{Price} DZD</Text>
          </View>
          <View className="flex-row justify-between p-2">
            <Text className="font-psemibold text-xl">Discount</Text>
            <Text className="text-xl font-pbold">
              {Price * (discount / 100)} DZD
            </Text>
          </View>
        </View>
        <View className="bg-[#f9f9f9] rounded-xl flex-row justify-between p-4">
          <Text className="font-psemibold text-xl ">Total</Text>
          <Text className="text-xl font-pbold">
            {Price - Price * (discount / 100)} DZD
          </Text>
        </View>

        <CustomButton
          title="Checkout"
          containerStyles="rounded-3xl m-2 mt-4"
          handlePress={() => router.push("patient/(tabs)/home")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

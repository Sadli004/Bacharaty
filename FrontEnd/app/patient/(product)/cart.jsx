import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import CustomButton from "../../../components/customButton";
import CartProduct from "../../../components/cartProduct";
import { useProductStore } from "../../../store/productStore";

const Cart = () => {
  const { getCart, cart, getSingleProduct, loadingCart } = useProductStore();
  const [Price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const isAndroid = Platform.OS == "android";
  const statusBarHeight = StatusBar.currentHeight;
  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    console.log("cart");
    const countPrice = () => {
      let price = 0;
      for (let i = 0; i < cart.length; i++) {
        price += cart[i].product.price * cart[i].quantity;
      }
      return price;
    };

    if (cart.length > 0) {
      setPrice(countPrice());
    } else {
      setPrice(0);
    }
    return () => {
      setPrice(0);
    };
  }, [cart]);
  if (loadingCart) {
    return (
      <View className="min-h-[70%] items-center justify-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <SafeAreaView
      className=" h-full border-primary bg-[#f9f9f9]"
      style={{ paddingTop: isAndroid ? statusBarHeight : 0 }}
    >
      <FlatList
        data={cart}
        keyExtractor={(item) => item._id}
        onRefresh={getCart}
        refreshing={loadingCart}
        renderItem={({ item }) => (
          <CartProduct
            item={item}
            handlePress={() => {
              // getSingleProduct(item?.product._id);
              router.push(`patient/product/${[item?.product._id]}`);
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
          {/* <View className="flex-row justify-between p-2">
            <Text className="font-psemibold text-xl">Discount</Text>
            <Text className="text-xl font-pbold">
              {Price * (discount / 100)} DZD
            </Text>
          </View> */}
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
          handlePress={() =>
            Alert.alert(
              "Out of stock",
              "The products you wish to purchase are currently out of stock"
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

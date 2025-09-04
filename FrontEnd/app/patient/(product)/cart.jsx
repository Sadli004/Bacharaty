import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  Platform,
  Alert,
  ActivityIndicator,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import CustomButton from "../../../components/customButton";
import CartProduct from "../../../components/cartProduct";
import FormField from "../../../components/formField";
import { useProductStore } from "../../../store/productStore";
import { icons } from "../../../constants";
import { Icon } from "../../../components/icon";

const Cart = () => {
  const { getCart, cart, getSingleProduct, loadingCart } = useProductStore();
  const [Price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const isAndroid = Platform.OS == "android";
  const statusBarHeight = StatusBar.currentHeight;
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
  useEffect(() => {
    getCart();
    console.log("cart");
  }, [getCart]);
  useEffect(() => {
    if (!loadingCart) {
      const countPrice = () => {
        let price = 0;
        for (let i = 0; i < cart.length; i++) {
          price += cart[i].product?.price * cart[i].quantity;
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
    }
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
      className=" h-full border-primary bg-background-light"
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

        <Text className="text-lg font-pregular">Cart</Text>
        <Icon
          source={icons.trash}
          resizeMode="contain"
          style="w-6 h-6 "
          tintColor={"red"}
          onPress={() => setDeleteMode((previous) => !previous)}
        />
      </View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item._id}
        onRefresh={getCart}
        refreshing={loadingCart}
        renderItem={({ item }) => (
          <View className={`flex-row items-center`}>
            <CartProduct
              item={item}
              handlePress={() => {
                router.push(`patient/product/${[item?.product._id]}`);
              }}
            />
            {deleteMode && (
              <View
                className={`rounded-full p-1 bg-transparent border h-6 w-6 mr-2`}
              ></View>
            )}
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="min-h-[70%] items-center justify-center">
            <Text className="font-pbold text-xl">No items listed yet </Text>
            <CustomButton title="Start shopping" />
          </View>
        )}
      />
      <View className="bg-[#F2F0EF] shadow-sm  m-2 rounded-3xl  p-4 mb-4">
        <View className=" flex-row justify-between rounded-xl px-3 py-2 mb-2">
          <Text className="font-psemibold text-xl">Price</Text>
          <Text className="text-xl font-pbold">{Price} DZD</Text>
        </View>
        <View className=" rounded-xl flex-row justify-between px-3 py-2">
          <Text className="font-psemibold text-xl ">Total</Text>
          <Text className="text-xl font-pbold">
            {Price - Price * (discount / 100)} DZD
          </Text>
        </View>

        <CustomButton
          title="Checkout"
          containerStyles="rounded-3xl m-2 mt-4"
          handlePress={() => setModalVisible(true)}
        />
      </View>
      <View>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 bg-background-light pt-10">
            <View className="px-4">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-2xl font-psemibold">
                  Order Information
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="p-2"
                >
                  <Image
                    source={icons.close || icons.minus} // Use close icon if available
                    resizeMode="contain"
                    className="h-6 w-6"
                  />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <FormField title="First name" />
                <FormField title="Last name" />
                <FormField title="Phone number" keyboardType="phone-pad" />
                <FormField title="Delivery state" defaultValue="Alger" />
                <FormField title="City" />

                <View className="my-6">
                  <CustomButton
                    title="Proceed to payment"
                    containerStyles="rounded-3xl"
                    // handlePress={handlePayment}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

import { View, Text, SafeAreaView, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import SearchInput from "../../components/searchInput";
import { icons, images } from "../../constants";
import { TouchableOpacity } from "react-native";
import PopularProducts from "../../components/popularProducts";
import ProductCard from "../../components/productCard";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
const Magasin = () => {
  // const [productData, setProductData] = useState([]);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const result = await axios.get("http://172.20.10.11:8082/product/");
  //       setProductData(result.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);
  const productData = [
    {
      id: "1",
      name: "Face Cream",
      price: "$25.00",
      description: "Hydrating face cream with natural ingredients.",
      image: "path/to/face_cream_image.jpg",
    },
    {
      id: "2",
      name: "Hair Serum",
      price: "$30.00",
      description: "Nourishing hair serum for smooth and shiny hair.",
      image: "path/to/hair_serum_image.jpg",
    },
    {
      id: "3",
      name: "Shampoo",
      price: "$15.00",
      description: "Gentle shampoo that cleanses and nourishes.",
      image: "path/to/shampoo_image.jpg",
    },
    {
      id: "4",
      name: "Coconut Oil",
      price: "$10.00",
      description: "Organic coconut oil for cooking and skincare.",
      image: "path/to/coconut_oil_image.jpg",
    },
    {
      id: "5",
      name: "Moisturizing Lotion",
      price: "$20.00",
      description: "Rich moisturizing lotion for all skin types.",
      image: "path/to/moisturizing_lotion_image.jpg",
    },
    {
      id: "6",
      name: "Sunscreen SPF 50",
      price: "$18.00",
      description: "Broad-spectrum sunscreen for ultimate protection.",
      image: "path/to/sunscreen_image.jpg",
    },
    {
      id: "7",
      name: "Lip Balm",
      price: "$5.00",
      description: "Natural lip balm to keep your lips hydrated.",
      image: "path/to/lip_balm_image.jpg",
    },
    {
      id: "8",
      name: "Body Scrub",
      price: "$22.00",
      description: "Exfoliating body scrub for smooth skin.",
      image: "path/to/body_scrub_image.jpg",
    },
  ];
  return (
    <SafeAreaView className="justify-center items-center w-full h-full bg-transparent">
      <View className="p-2">
        <FlatList
          data={productData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => <ProductCard item={item} />}
          ListHeaderComponent={
            <View className="w-[90vw]">
              <View className="flex-row justify-between">
                <Text className="font-psemibold text-xl">Welcome User</Text>
                <TouchableOpacity>
                  <Image
                    source={icons.bag}
                    resizeMode="contain"
                    className="w-6 h-6"
                  />
                </TouchableOpacity>
              </View>

              <SearchInput otherStyles="mt-5" />
              <View className="pt-5  w-full flex-1">
                <Text className="font-pbold mb-3 text-lg">Our offers</Text>
              </View>
              <PopularProducts />
            </View>
          }
          ListEmptyComponent={
            <View className="items-center justify-center h-full">
              <Text className="font-pbold text-xl">No items listed yet</Text>
            </View>
          }
        />
      </View>
      <StatusBar style="dark" backgroundColor="red" />
    </SafeAreaView>
  );
};

export default Magasin;

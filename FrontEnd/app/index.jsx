import { Redirect, router } from "expo-router";
import { ImageBackground, Text, View } from "react-native";
import { images } from "../constants";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/customButton";
import * as SecureS from "expo-secure-store";
import { useEffect } from "react";
export default function Index() {
  const handleGetToken = async () => {
    const token = await SecureS.getItemAsync("token");
    if (token) {
      router.push("/home");
    } else {
      router.push("/sign-in");
    }
  };
  useEffect(() => {
    handleGetToken();
  }, []);
  return (
    <View className="items-center justify-center">
      <ImageBackground
        source={images.first_screen}
        className="w-full h-full items-center justify-end"
        resizeMode="cover"
      >
        <View className=" bg-gray-100 items-center rounded-t-3xl p-4">
          <Text className="font-pbold text-xl">Welcome to Bacharty</Text>
          <Text className="text-center mt-4">
            Découvrez la première boutique en ligne spécialisée dans les
            produits de soins dermatologiques, approuvés par des experts.
          </Text>
          <CustomButton
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="w-[80vw] mb-4"
            title="Commencer"
          />
        </View>
      </ImageBackground>
      <StatusBar style="dark" />
    </View>
  );
}

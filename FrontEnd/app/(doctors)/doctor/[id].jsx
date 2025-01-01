import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { icons, images } from "../../../constants";
import CustomButton from "../../../components/customButton";
const Docotor = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView className="h-full">
      <View className="p-4 border border-red-200 h-full ">
        <View className="flex-row items-center gap-4  border-b border-gray-300 pb-7">
          <Image
            source={images.doctor}
            resizeMode="cover"
            className="h-[180px] w-[180px] rounded-xl border border-primary"
          />
          <View>
            <Text className="font-psemibold text-xl">Dr. Mahani</Text>
            <Text className="text-lg font-pregular">1200DA per hour</Text>
            <Text>
              Rating : 4{" "}
              <Image
                source={icons.star}
                resizeMode="contain"
                className="h-4 w-4"
                tintColor="orange"
              />
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between border-b border-gray-300 p-7">
          <Text> 10 years Experience</Text>
          <Text>Placement : Algiers</Text>
        </View>
        <View className="border-b border-gray-300 mt-7 pb-7">
          <Text className="font-psemibold mb-4 text-xl">About me</Text>
          <Text className="font-pregular">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, quia
            laborum! Ullam ratione excepturi quidem blanditiis quaerat cum
            architecto aut eos?
          </Text>
        </View>
        <View className=" mt-7">
          <CustomButton title="Book apointment" containerStyles="" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Docotor;

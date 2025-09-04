import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ImageBackground,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import CustomButton from "../../../components/customButton";
import { useUserStore } from "../../../store/userStore";
import { icons, images } from "../../../constants";
import { useProductStore } from "../../../store/productStore";
import { useDoctorStore } from "../../../store/doctorStore";
import DoctorList from "../../../components/doctorList";
import { router } from "expo-router";

const main = () => {
  const { user } = useUserStore();
  const { products, fetchProducts } = useProductStore();
  const { fetchDoctors, doctors } = useDoctorStore();
  const statusBarHeight = StatusBar.currentHeight;

  useEffect(() => {
    fetchProducts();
    fetchDoctors();
  }, []);
  useEffect(() => {
    if (!user) router.replace("sign-in");
  }, []);
  return (
    <SafeAreaView
      className={`bg-background-light dark:bg-background-dark flex-1`}
      style={{ paddingTop: Platform.OS == "android" ? statusBarHeight : 0 }}
    >
      <View className="mx-2">
        <View className=" mb-4 flex-row justify-between items-center">
          <View>
            <Text className="text-sm font-pregular">Welcome back </Text>
            <Text className="text-lg font-psemibold">{user?.name}</Text>
          </View>
          <Image
            source={images.logo_horizontal}
            resizeMode="contain"
            className="h-12 w-24 "
          />
        </View>
        <View className="space-y-2 mb-4">
          <Text className="font-psemibold text-xl">My next appointment</Text>
          <TouchableOpacity
            onPress={() => router.push("patient/appointments")}
            className="bg-gray-light p-4 rounded-xl shadow "
          >
            <View className="flex-row items-center">
              <Image
                source={{
                  uri: doctors[0]?.profilePicture,
                }}
                className="w-16 h-16 rounded-full mr-3"
              />
              <View className="items-start">
                <Text className="text-lg font-psemibold">
                  {doctors[0]?.name}
                </Text>
                <View className={`flex-row gap-2 items-center`}>
                  <Image
                    source={icons.calendar}
                    className={`w-5 h-5`}
                    resizeMode="contain"
                  />
                  <Text className="text-gray-500 font-pregular">
                    21 Juin 2025
                  </Text>
                </View>
                <View className={`flex-row gap-2 items-center`}>
                  <Image
                    source={icons.clock}
                    className={`w-6 h-6`}
                    resizeMode="contain"
                  />
                  <Text className="text-gray-500 font-pregular">11:30</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-psemibold text-lg">Top Doctors</Text>
          <TouchableOpacity>
            <Text className=" text-lg">See all</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View className="h-full mx-2"> */}

      <FlatList
        data={doctors}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <DoctorList item={item} />;
        }}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

export default main;

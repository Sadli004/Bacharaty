import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ImageBackground,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import CustomButton from "../../../components/customButton";
import { useUserStore } from "../../../store/userStore";
import { images } from "../../../constants";
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
      className="bg-background-light h-full "
      style={{ paddingTop: Platform.OS == "android" ? statusBarHeight : 0 }}
    >
      {/* <View className="h-full mx-2"> */}

      <FlatList
        data={doctors}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <DoctorList item={item} />;
        }}
        ListHeaderComponent={() => {
          return (
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
                <Text className="font-psemibold text-xl">
                  My next appointment
                </Text>
                <View className="bg-gray-light p-4 rounded-xl shadow ">
                  <View className="flex-row items-center">
                    <Image
                      source={{
                        uri: doctors[0]?.profilePicture,
                      }}
                      className="w-16 h-16 rounded-full mr-3"
                    />
                    <View>
                      <Text className="text-lg font-pbold">
                        {doctors[0]?.name}
                      </Text>
                      <Text className="text-gray-500">21 Juin 2025</Text>
                      <Text className="text-gray-500">11:30</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <Text className="font-psemibold text-xl">
                  Top rated this week!!
                </Text>
                <FlatList
                  data={products}
                  keyExtractor={(item) => item._id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <View className="flex-between p-2 gap-2 mb-4 border h-[200px] w-[200px] bg-transparent">
                        {/* <Image
                          source={{ uri: item.picture }}
                          className="h-[120px] w-[120px] bg-white"
                          resizeMode="contain"
                        /> */}
                        <ImageBackground
                          source={{ uri: item.picture }}
                          className=" flex-1 "
                          resizeMode="contain"
                        >
                          <Text className="text-sm font-plight">
                            {item.name}
                          </Text>
                          <CustomButton
                            title="check it out"
                            containerStyles="bg-secondary rounded-3xl"
                          />
                        </ImageBackground>
                      </View>
                    );
                  }}
                />
              </View>
              <Text className="font-psemibold text-xl">
                Top rated Doctors in your area
              </Text>
            </View>
          );
        }}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

export default main;

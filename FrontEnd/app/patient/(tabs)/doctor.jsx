import { View, Text, FlatList, SafeAreaView, Image } from "react-native";
import React, { useEffect } from "react";
import { icons, images } from "../../../constants";
import { Link, router } from "expo-router";
import CustomButton from "../../../components/customButton";
import SearchInput from "../../../components/searchInput";
import { TouchableOpacity } from "react-native";
import { useDoctorStore } from "../../../store/doctorStore";
const Doctor = () => {
  const { fetchDoctors, doctors, getDoctorProfile, doctor } = useDoctorStore();
  useEffect(() => {
    fetchDoctors();
  }, []);

  const myp = "#D6F0F3";
  return (
    <View className="flex-1">
      {/* Header */}
      <SafeAreaView className="  mb-4 bg-secondary ">
        <View className="p-2 mt-2">
          <Text className="font-psemibold text-xl mb-2 mx-2">Doctors</Text>
          <SearchInput otherStyles="rounded-3xl bg-light " />
        </View>
      </SafeAreaView>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          console.log(item.profilePicture);
          return (
            <TouchableOpacity
              onPress={() => {
                getDoctorProfile(item._id);
                router.push(`patient/doctor/${doctor._id}`);
              }}
              className=" bg-lactive shadow-md   p-2 m-1 mx-2 rounded-xl flex-row items-center h-[100px] overflow-hidden"
            >
              <Image
                source={images.profile_doc || item.profilePicture}
                resizeMode="cover"
                className="h-16 w-16 rounded-full border border-white mr-3"
              />
              <View className="m-2 flex-shrink">
                <Text className="font-psemibold text-xl">{item.name}</Text>
                <Text>Location : {item.location}</Text>
                <Text>{item.experience} of experience</Text>
                <Text className="">
                  Rating: 4.9{" "}
                  <Image
                    source={icons.star}
                    className="h-4 w-4"
                    resizeMode="contain"
                    tintColor="orange"
                  />
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Doctor;

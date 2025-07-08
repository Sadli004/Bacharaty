import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import { useDoctorStore } from "../store/doctorStore";
import { router } from "expo-router";

export default function DoctorList({ item, handlePress }) {
  return (
    <TouchableOpacity
      onPress={() => router.push(`patient/doctor/${item._id}`)}
      className=" bg-light  w-[50vw]  p-2  m-2 rounded-xl items-center overflow-hidden"
    >
      <Image
        source={{ uri: item.profilePicture }}
        resizeMode="cover"
        className="h-[150px] w-full mx-2 rounded-xl border border-white mr-3"
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
}

const styles = StyleSheet.create({});

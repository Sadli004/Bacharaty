import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { icons, images } from "../constants";

export default function DoctorList({ item, handlePress }) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className=" bg-lgray shadow-sm   p-2 m-1 mx-2 rounded-xl flex-row items-center h-[100px] overflow-hidden"
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
}

const styles = StyleSheet.create({});

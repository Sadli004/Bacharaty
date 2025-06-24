import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
const SearchInput = ({ otherStyles }) => {
  return (
    <View
      className={`w-full h-12 border border-gray-light shadow-md  bg-gray-100 rounded-xl justify-between flex-row items-center ${otherStyles}`}
    >
      <TextInput
        className="flex-1 items-center p-4 "
        placeholder="Type to search"
        placeholderTextColor="gray"
      />
      <Image
        source={icons.search}
        tintColor="#1c5c73"
        resizeMode="contain"
        className="w-5 h-5 mr-2"
      />
    </View>
  );
};

export default SearchInput;

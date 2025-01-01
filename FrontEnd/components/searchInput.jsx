import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
const SearchInput = ({ otherStyles }) => {
  return (
    <View
      className={`w-full h-14 border border-primary focus:border-secondary bg-gray-100 rounded-xl justify-between flex-row items-center ${otherStyles}`}
    >
      <TextInput
        className="flex-1 items-center p-4 "
        placeholder="Type to search"
        placeholderTextColor="#1c5c73"
      />
      <Image
        source={icons.search}
        tintColor="#1c5c73"
        resizeMode="contain"
        className="w-6 h-6 mr-2"
      />
    </View>
  );
};

export default SearchInput;

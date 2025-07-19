import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
const SearchInput = ({ otherStyles }) => {
  return (
    <View
      className={`w-full h-12  shadow-md   rounded-xl justify-between flex-row items-center ${otherStyles}`}
    >
      <TextInput
        className="flex-1 items-center p-4 "
        placeholder="Type to search"
        placeholderTextColor="gray"
      />
      <Image
        source={icons.search}
        tintColor={"#2e2e2e"}
        resizeMode="contain"
        className="w-5 h-5 mr-2"
      />
    </View>
  );
};

export default SearchInput;

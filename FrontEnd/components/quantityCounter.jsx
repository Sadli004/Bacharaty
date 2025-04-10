import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";

const Counter = ({ count }) => {
  // const [count, setCount] = useState(1);

  return (
    <View className=" rounded-xl flex-row items-center space-x-2 bg-primary">
      <TouchableOpacity
        className=" "
        // onPress={() => count > 1 && setCount(count - 1)}
      >
        <Image
          source={icons.minus}
          resizeMode="contain"
          tintColor="white"
          className="w-4 h-4 mx-1"
        />
      </TouchableOpacity>
      <Text className="text-lg px-1 text-white">{count}</Text>
      <TouchableOpacity
        className=""
        // onPress={() => setCount(count + 1)}
      >
        <Image
          source={icons.plus}
          resizeMode="contain"
          tintColor="white"
          className="w-4 h-4 mx-1"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

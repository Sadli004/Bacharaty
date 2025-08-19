import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "../constants";

const SettingSection = ({ title, Icon, isDark, isLast, handlePress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className={`flex-row items-center justify-between p-2 ${
        !isLast && "border-b border-gray-300"
      } ${isDark && "border-gray-400"}`}
      onPress={handlePress}
    >
      <View className="flex-row items-center gap-2">
        <Image
          source={Icon}
          resizeMode="contain"
          className="h-6 w-6"
          tintColor={isDark ? "white" : "black"}
        />
        <Text className={`${isDark && "text-white"}`}>{title}</Text>
      </View>
      <Image
        source={icons.rightArrow}
        className="h-6 w-6"
        resizeMode="contain"
        tintColor={isDark ? "white" : "black"}
      />
    </TouchableOpacity>
  );
};

export default SettingSection;

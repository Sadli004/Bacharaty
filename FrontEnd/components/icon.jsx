import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

export const Icon = ({ source, tintColor, style, resizeMode, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={source}
        tintColor={tintColor}
        className={style}
        resizeMode={resizeMode}
      />
    </TouchableOpacity>
  );
};

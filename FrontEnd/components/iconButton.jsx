import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const IconButton = ({
  handlePress,
  Icon,
  iconStyles,
  tintColor,
  buttonStyles,
}) => {
  return (
    <TouchableOpacity onPress={handlePress} className={buttonStyles}>
      <Image
        source={Icon}
        resizeMode="contain"
        className={iconStyles}
        tintColor={tintColor}
      />
    </TouchableOpacity>
  );
};

export default IconButton;

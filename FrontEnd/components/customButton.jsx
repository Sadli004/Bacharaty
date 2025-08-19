import { Image, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { icons } from "../constants";

const CustomButton = ({
  handlePress,
  title,
  containerStyles,
  textStyles,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={`bg-primary rounded-lg  mt-4 p-2 ${containerStyles}`}
      onPress={handlePress}
    >
      {props.icon ? (
        <Image
          source={props.icon}
          resizeMode="conatin"
          className="h-5 w-5"
          tintColor="#0CC0DF"
        />
      ) : (
        <Text
          className={`text-gray-100 font-psemibold text-center text-white  ${textStyles}`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

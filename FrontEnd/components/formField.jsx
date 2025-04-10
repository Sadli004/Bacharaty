import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { TouchableOpacity } from "react-native";
const FormField = ({
  title,
  value,
  handleChange,
  placeholder,
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 w-full flex-column ${props.containerStyles}`}>
      <Text>{title}</Text>
      <View
        className={`w-full h-14 border border-primary focus:border-pactive bg-gray-100 rounded-xl justify-between flex-row items-center ${props.otherStyles}`}
      >
        <TextInput
          className="flex-1 items-center p-4 "
          placeholder={placeholder}
          placeholderTextColor="black"
          defaultValue={props.defaultValue}
          keyboardType={keyboardType}
          onChangeText={handleChange}
          secureTextEntry={props.type === "password" && !showPassword}
        />
        {props.type === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              resizeMode="contain"
              className="h-6 w-6 mr-4"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

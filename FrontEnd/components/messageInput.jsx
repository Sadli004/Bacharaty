import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { TouchableOpacity } from "react-native";
const MessageInput = ({ value, handleChange, placeholder, otherStyles }) => {
  const [istyping, setIsTyping] = useState(true);
  return (
    <View
      className={` ${otherStyles} w-full h-14 border border-primary focus:border-secondary bg-gray-100 rounded-2xl justify-between flex-row items-center`}
    >
      <TextInput
        className="flex-1 items-center p-4 "
        placeholder={placeholder}
        placeholderTextColor="#1c5c73"
        keyboardType="default"
        value={value}
        onChange={handleChange}
      />
      {istyping ? (
        <TouchableOpacity>
          <Image
            source={icons.send}
            tintColor="#1c5c73"
            resizeMode="contain"
            className="w-6 h-6 mr-2"
          />
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity>
            <Image
              source={icons.camera}
              tintColor="#1c5c73"
              resizeMode="contain"
              className="w-6 h-6 mr-2"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={icons.mic}
              tintColor="#1c5c73"
              resizeMode="contain"
              className="w-6 h-6 mr-2"
            />
          </TouchableOpacity>
        </>
      )}
    </View>
    // </View>
  );
};

export default MessageInput;

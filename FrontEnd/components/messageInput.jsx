import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Audio } from "expo-av";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
const MessageInput = ({
  value,
  setValue,
  placeholder,
  otherStyles,
  handleSend,
  isDark,
}) => {
  // send a picture from camera
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Captured Image:", result.assets[0].uri);
    }
  };
  // send a picture from gallery
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Gallery permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      console.log("Selected Image:", result.assets[0].uri);
    }
  };
  const {
    recording,
    audioUri,
    isRecording,
    startRecording,
    stopRecording,
    reset,
  } = useAudioRecorder();

  // Upload a file
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (result.type !== "cancel") {
      console.log("Selected File:", result.name);
    }
  };
  // handleSendAudio
  const handleSendAudio = () => {
    if (audioUri) {
      // handleSend({ type: 'audio', uri: audioUri });
      // reset();
      console.log(audioUri);
    }
  };
  return (
    <View className="flex-row w-full items-center gap-1 mt-1">
      <TouchableOpacity onPress={pickFile}>
        <View
          className={`rounded-full ${
            isDark ? "bg-gray-dark" : "bg-gray-light"
          } p-2`}
        >
          <Image
            source={icons.attachment}
            // tintColor="#1c5c73"
            tintColor="gray"
            resizeMode="contain"
            className="w-5 h-5 "
          />
        </View>
      </TouchableOpacity>
      <View
        className={` ${otherStyles} flex-1 h-12 ${
          isDark ? "bg-gray-dark" : "bg-gray-light"
        } focus:border-pactive  rounded-3xl justify-between flex-row items-center`}
      >
        {audioUri && (
          <View className="flex-row items-center bg-white border rounded-xl px-2 py-1 mb-2 mx-2">
            <Text className="flex-1">Audio ready</Text>
            <TouchableOpacity onPress={reset}>
              <Text className="text-red-500 px-2">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSendAudio}>
              <Text className="text-green-600 font-bold px-2">Send</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* <TouchableOpacity onPress={pickFile}>
            <Image
              source={icons.attachment}
              tintColor="#1c5c73"
              resizeMode="contain"
              className="w-5 h-5 mr-2"
            />
          </TouchableOpacity> */}
        <TextInput
          className="flex-1 items-center p-4 "
          placeholder={placeholder}
          placeholderTextColor="gray"
          keyboardType="default"
          value={value}
          onChangeText={(newText) => setValue(newText)}
        />
        {value.trim() ? (
          <TouchableOpacity onPress={handleSend}>
            <Image
              source={icons.send}
              tintColor="#1c5c73"
              resizeMode="contain"
              className="w-6 h-6 mr-2"
            />
          </TouchableOpacity>
        ) : (
          <>
            {/* <TouchableOpacity onPress={pickFile}>
            <Image
              source={icons.attachment}
              tintColor="#1c5c73"
              resizeMode="contain"
              className="w-5 h-5 mr-2"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery}>
            <Image
              source={icons.gallery}
              tintColor="#1c5c73"
              resizeMode="contain"
              className="w-5 h-5 mr-2"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openCamera}>
            <Image
              source={icons.camera}
              tintColor="#1c5c73"
              resizeMode="contain"
              className="w-6 h-6 mr-2"
            />
          </TouchableOpacity> */}
            <TouchableOpacity
              onPressIn={startRecording}
              onPressOut={stopRecording}
            >
              <Image
                source={icons.mic}
                tintColor="gray"
                resizeMode="contain"
                className="w-5 h-5 mr-2"
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
    // </View>
  );
};

export default MessageInput;

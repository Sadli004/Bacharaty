import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { icons, images } from "../../../../constants";
import CustomButton from "../../../../components/customButton";
import BookingCalendar from "../../../../components/bookingCalendar";
import { useDoctorStore } from "../../../../store/doctorStore";
import { useChatStore } from "../../../../store/chatStore";
import { useUserStore } from "../../../../store/userStore";
const Docotor = () => {
  const { user } = useUserStore();
  const { doctor } = useDoctorStore();
  const { startNewChat } = useChatStore();
  const { chats, chatId } = useChatStore();
  const handleStartChat = async () => {
    if (chats.length != 0) {
      const existingChat = chats.find(
        (chat) => chat.receiver._id == doctor._id
      );
      console.log(existingChat);
      if (existingChat) router.replace(`patient/${existingChat.chatId._id}`);
    } else {
      const newChatId = await startNewChat(user._id, doctor._id);
      if (newChatId) router.replace(`patient/${newChatId}`);
    }
  };

  return (
    <View className="flex-1 bg-[#f9f9f9]">
      {/* Doctor Info Card */}
      <View className="items-center p-4">
        <Image
          source={{ uri: doctor.profilePicture } || images.profile} // Replace with actual URL or local image
          className="w-28 h-28 rounded-full border-2 border-primary"
          resizeMode="cover"
        />
        <Text className="mt-2 text-3xl font-psemibold text-gray-800">
          {doctor.name}
        </Text>
        <Text className="text-sm text-gray-500">Dermatologue</Text>
      </View>

      {/* Details Section */}
      <View className="flex-column gap-2 justify-around p-4">
        <View className=" p-2 rounded-xl shadow-lg bg-white justify-between flex-row ">
          <View className=" border-r flex-1 mr-4 items-center flex-row gap-2">
            <Image
              source={icons.expertise}
              className="h-6 w-6"
              resizeMode="contain"
            />
            <View className="items-center">
              <Text className="mt-1 text-sm font-bold text-gray-800">
                +{doctor.experience}
              </Text>
              <Text className="text-xs text-gray-500">Experience</Text>
            </View>
          </View>
          <View className="items-center flex-row ">
            <View>
              <Image
                source={icons.star}
                resizeMode="contain"
                className="h-5 w-5"
                tintColor="orange"
              />
            </View>
            <View className="items-start mx-3">
              <Text className="mt-1 text-sm font-bold text-gray-800">4.8</Text>
              <Text className="text-xs text-gray-500">Rating</Text>
            </View>
          </View>
        </View>
        <View className=" p-2 rounded-xl shadow-lg bg-white flex-row items-center">
          <View>
            <Image
              source={icons.money}
              resizeMode="contain"
              className="h-6 w-6"
            />
          </View>
          <View className="items-start mx-3">
            <Text className="mt-1 text-sm font-bold text-gray-800">
              {doctor.feePerConsultation}
            </Text>
            <Text className="text-xs text-gray-500">Consultation Fee</Text>
          </View>
        </View>
      </View>

      {/* About Me Section */}
      <View className="py-8 px-4">
        <Text className="text-lg font-pbold text-xl text-gray-800">
          About me
        </Text>
        <Text className="mt-2 text-lg text-gray-600">
          I am {doctor.name} specialist in dermatology for over 10 years, I am
          currently based in Algiers and available for appointments
        </Text>
      </View>
      {/* Booking Calendar */}
      {/* <BookingCalendar /> */}
      {/* Buttons */}
      <SafeAreaView className="flex-row justify-around p-4 mx-2 mt-8">
        <CustomButton
          title="Send a message"
          containerStyles="flex-1 bg-primary rounded-3xl py-2 mx-2 p-4 flex-1 shadow-md"
          textStyles="text-white items-center"
          handlePress={() => {
            handleStartChat();
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default Docotor;

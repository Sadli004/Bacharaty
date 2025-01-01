import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { icons, images } from "../../constants";
import React, { useEffect, useState } from "react";
import MessageInput from "../../components/messageInput";

const Chat = () => {
  const [message, setMessage] = useState("");

  const messages = [
    {
      id: 1,
      text: "Hello, how can I help you?",
      timestamp: new Date(),
      isUser: true,
    },
    {
      id: 2,
      text: "I'm looking for a product recommendation.",
      timestamp: new Date(),
      isUser: false,
    },
    {
      id: 3,
      text: "I've tried some Dove soap, but they're not what I'm looking for.",
      timestamp: new Date(),
      isUser: true,
    },
  ];
  return (
    <SafeAreaView className="h-full ">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="p-2"
      >
        <View className="h-full">
          <View className="items-center justify-start gap-4 flex-row p-2 mb-7 border-b border-gray-200">
            <Image
              source={icons.leftArrow}
              resizeMode="contain"
              className="h-5 w-5"
            />
            <View className="flex-row items-center gap-2">
              <Image
                source={images.doctor}
                resizeMode="cover"
                className="h-10 w-10 rounded-full"
              />
              <Text className="text-xl">Dr. Salah</Text>
            </View>
          </View>
          <View className="flex-1 justify-end">
            <FlatList
              data={messages}
              inverted={messages.length !== 0}
              renderItem={({ item }) => (
                <View
                  className={` p-3 m-2 ${
                    item.isUser
                      ? " bg-primary self-start rounded-t-xl rounded-br-xl"
                      : " bg-gray-200 self-end rounded-t-xl rounded-bl-xl"
                  }`}
                >
                  <Text
                    className={` font-pregular ${item.isUser && "text-white"}`}
                  >
                    {item.text}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <View className=" min-h-[70vh] items-center justify-center">
                  <Text className="font-semibold text-xl">
                    Send a message to start conversation
                  </Text>
                </View>
              }
            />
          </View>
          <View className="m-2">
            <MessageInput
              placeholder="Type a message"
              value={message}
              handleChange={(e) => {
                setMessage(e.target.value);
              }}
              otherStyles="shadow-md"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

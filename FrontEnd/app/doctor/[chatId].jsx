import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { icons } from "../../constants";
import React, { useEffect, useState, useRef } from "react";
import MessageInput from "../../components/messageInput";
import { router, useLocalSearchParams } from "expo-router";
import { useChatStore } from "../../store/chatStore";
import { useUserStore } from "../../store/userStore";
import { formatDate, formatTime } from "../../utils/date";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

const Chat = () => {
  const { chatId } = useLocalSearchParams();
  const MessagesRef = useRef(null);
  const [message, setMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isEditing, setIsEditing] = useState();
  const {
    messages,
    getChatMessages,
    sendMessage,
    chat,
    editMessage,
    deleteMessage,
  } = useChatStore();
  const { user } = useUserStore();
  useEffect(() => {
    getChatMessages(chatId);
  }, [chatId]);
  useEffect(() => {
    if (messages.length > 0) {
      MessagesRef?.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);
  const handleSendMessage = () => {
    if (message.trim()) {
      if (isEditing) {
        editMessage(selectedMessage._id, message);
        setIsEditing(false);
        setSelectedMessage(null);
      } else {
        sendMessage(chatId, message);
      }
      setMessage(""); // Clear input after sending
    }
  };
  const handleLongPress = (msg) => {
    if (msg.content) {
      Alert.alert(
        "Message Options",
        "Choose an action:",
        [
          { text: "Edit", onPress: () => handleEditMessage(msg) },
          {
            text: "Delete",
            onPress: () => deleteMessage(msg._id),
            style: "destructive",
          },
          { text: "Cancel", style: "cancel" },
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert(
        "No Message",
        "This message does not have any content to edit.",
        [{ text: "OK", style: "cancel" }],
        { cancelable: true }
      );
    }
  };
  const handleEditMessage = (msg) => {
    setMessage(msg.content);
    setSelectedMessage(msg);
    setIsEditing(true);
  };

  return (
    <View className="flex-1 bg-[#f9f9f9]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/**Header */}
        <SafeAreaView className="bg-lgray items-center justify-between flex-row h-auto">
          <View className="flex-row items-center py-2  ml-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={icons.leftArrow}
                resizeMode="contain"
                className="h-6 w-6 "
                tintColor="#0CC0DF"
              />
            </TouchableOpacity>
            <View className="flex-row items-center gap-2 ml-2">
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/32.jpg",
                }}
                resizeMode="cover"
                className="h-10 w-10 rounded-full"
              />
              <Text className="text-xl">{chat?.receiver.name}</Text>
            </View>
          </View>
          <View className="flex-row gap-4 items-center mr-4">
            <TouchableOpacity>
              <Image
                source={icons.audio_call}
                resizeMode="contain"
                className="h-6 w-6"
                tintColor="#0CC0DF"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={icons.video_call}
                resizeMode="contain"
                className="h-8 w-8"
                tintColor="#0CC0DF"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View className="flex-1 justify-end">
          <FlatList
            data={messages}
            extraData={messages}
            ref={MessagesRef}
            onContentSizeChange={() =>
              MessagesRef.current?.scrollToEnd({ animated: true })
            }
            refreshing
            onRefresh={() => getChatMessages(chatId)}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => {
              const isSender = item.sender == user._id;
              const isSameSender =
                index > 0 && messages[index - 1].sender === item.sender;
              const newDay =
                (index > 0 &&
                  new Date(messages[index - 1].createdAt).toDateString() !=
                    new Date(item.createdAt).toDateString()) ||
                index === 0;
              return (
                <>
                  {newDay && (
                    <Text className="self-center my-2">
                      {formatDate(item.createdAt)}
                    </Text>
                  )}
                  {item.content && (
                    <TouchableOpacity
                      onLongPress={() => handleLongPress(item)}
                      activeOpacity={1}
                      className={`p-3 ${isSameSender ? "mx-2 my-0.5" : "m-2"} 
                      ${
                        isSender
                          ? ` self-end rounded-t-xl rounded-bl-xl ${
                              item.content && "bg-secondary"
                            }
                        ${item.media && "border flex-1 border-primary"}`
                          : "bg-lgray self-start rounded-t-xl rounded-br-xl"
                      }`}
                    >
                      <>
                        <Text className={`font-pregular `}>{item.content}</Text>
                        <Text className="text-xs font-plight text-gray-300 self-end">
                          {formatTime(item.createdAt)}
                        </Text>
                      </>
                    </TouchableOpacity>
                  )}

                  {item.media && (
                    <Image
                      source={{ uri: item.media }}
                      resizeMode="cover"
                      style={{ width: 200, height: 250 }}
                      className={`border border-primary flex-1 mx-2 rounded-xl ${
                        isSender ? "self-end" : "self-start"
                      }`}
                    />
                  )}
                </>
              );
            }}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={
              <View className="min-h-[70vh] items-center justify-center">
                <Text className="font-semibold text-xl">
                  Send a message to start conversation
                </Text>
              </View>
            }
          />
        </View>
        <SafeAreaView className="mx-2 mb-4 ">
          <MessageInput
            placeholder="Type a message"
            value={message}
            setValue={setMessage}
            handleSend={handleSendMessage}
            otherStyles="shadow-md mt-1"
            // istyping={message == "" ? false : true}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;

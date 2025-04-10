import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import SearchInput from "../../../components/searchInput";
import { images } from "../../../constants";
import { useChatStore } from "../../../store/chatStore";
import { useEffect } from "react";
import { router } from "expo-router";
import { useUserStore } from "../../../store/userStore";
import { formatTime, fromLastMsg } from "../../../utils/date";
export default function Chat() {
  const { getUserChats, chats } = useChatStore();
  const { user } = useUserStore();
  useEffect(() => {
    getUserChats();
  }, []);
  return (
    <View className="flex-1">
      {/*Header */}
      <SafeAreaView className="bg-secondary h-[160px] mb-4">
        <View className="p-2">
          <Text className="font-pbold text-xl mb-2">Chats</Text>
          <SearchInput otherStyles="rounded-3xl bg-light" />
        </View>
      </SafeAreaView>
      <View>
        <FlatList
          data={chats}
          extraData={chats}
          refreshing
          onRefresh={() => {
            getUserChats();
          }}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row gap-2 border-b border-secondary p-2 items-center"
              onPress={() => router.push(`patient/${item.chatId._id}`)}
            >
              <View className="items-center justify-center">
                {!item.isSeen && (
                  <View className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </View>
              <Image
                source={images.profile_doc}
                className="rounded-full w-16 h-16"
                resizeMode="cover"
              />
              <View className=" ">
                <View className="flex-1">
                  <Text className="text-xl font-psemibold">
                    {item.receiver?.name}
                  </Text>
                  <Text
                    className="font-pregular "
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.chatId?.lastMessage?.sender._id == user._id
                      ? "You"
                      : item.receiver?.name}
                    :{" "}
                    {!item.chatId?.lastMessage?.content
                      ? "Sent an image"
                      : item.chatId?.lastMessage?.content}
                  </Text>
                </View>
                <View className="">
                  <Text className="text-xs text-gray-500">
                    {fromLastMsg(item.chatId?.lastMessage?.createdAt) || "2h"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

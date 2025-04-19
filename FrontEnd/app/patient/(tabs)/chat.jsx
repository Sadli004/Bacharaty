import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import SearchInput from "../../../components/searchInput";
import { images } from "../../../constants";
import { useChatStore } from "../../../store/chatStore";
import { useEffect } from "react";
import { router } from "expo-router";
import { useUserStore } from "../../../store/userStore";
import { formatTime, fromLastMsg } from "../../../utils/date";
export default function Chat() {
  const { getUserChats, chats, receiver, loadingChats } = useChatStore();
  const { user } = useUserStore();
  const isAndroid = Platform.OS == "android";
  const statusBarHeight = StatusBar.currentHeight;
  useEffect(() => {
    getUserChats();
  }, []);
  if (!user) router.replace("auth/sign-in");
  return (
    <View className="flex-1">
      {/*Header */}
      <SafeAreaView
        className="bg-secondary  "
        style={{ paddingTop: isAndroid ? statusBarHeight : 0 }}
      >
        <View className="p-2">
          <Text className="font-pbold text-xl mb-2">Chats</Text>
          <SearchInput otherStyles="rounded-3xl bg-light" />
        </View>
      </SafeAreaView>
      <View className="mt-3">
        <FlatList
          data={chats}
          extraData={chats}
          refreshing={loadingChats}
          onRefresh={() => {
            getUserChats();
          }}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className={`flex-row gap-2 border-b border-gray p-2 items-center ${
                index != 0 && "mt-0.5"
              }`}
              // style={{ marginTop: index != 0 ? 10 : 0 }}
              onPress={() => router.push(`patient/${item.chatId?._id}`)}
            >
              <View className="items-center justify-center">
                {!item.isSeen && (
                  <View className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </View>
              <Image
                source={{
                  uri:
                    receiver?.profilePicture ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
                }}
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
                    {!item.chatId?.lastMessage?.content &&
                    item.chatId.lastMessage?.media
                      ? "Sent an image"
                      : item.chatId?.lastMessage?.content
                      ? item.chatId?.lastMessage?.content
                      : ""}
                  </Text>
                </View>
                <View className="">
                  <Text className="text-xs text-gray-500">
                    {fromLastMsg(item.chatId?.lastMessage?.createdAt) || ""}
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

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
import { useColorScheme } from "nativewind";
export default function Chat() {
  const { getUserChats, chats, receiver, loadingChats } = useChatStore();
  const { user } = useUserStore();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme == "dark";
  const isAndroid = Platform.OS == "android";
  const statusBarHeight = StatusBar.currentHeight;
  useEffect(() => {
    getUserChats();
  }, []);
  if (!user) router.replace("/sign-in");
  return (
    <SafeAreaView
      className={`flex-1 ${
        isDark ? "bg-background-dark" : "bg-background-light"
      }`}
    >
      {/*Header */}
      <View
        className="bg-transparent"
        style={{ paddingTop: isAndroid ? statusBarHeight : 0 }}
      >
        <View className="p-2">
          <Text
            className={`font-psemibold text-xl mb-2 mx-2 ${
              isDark && "text-white"
            }`}
          >
            Chats
          </Text>
          <SearchInput
            otherStyles={`rounded-3xl ${
              isDark ? "bg-gray-dark" : " bg-gray-light"
            }  `}
          />
        </View>
      </View>
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
              className={`flex-row gap-4  border-b ${
                isDark ? "border-gray-dark" : "border-gray-light"
              }  p-2 items-center ${index != 0 && "mt-0.5"}`}
              onPress={() =>
                router.push({
                  pathname: "/[chatId]",
                  params: { chatId: item?.chatId?._id },
                })
              }
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
                  <Text
                    className={`text-xl font-psemibold ${
                      isDark && "text-gray-light"
                    }`}
                  >
                    {item.receiver?.name}
                  </Text>
                  <Text
                    className={`${isDark && "text-gray-light"} font-pregular `}
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
    </SafeAreaView>
  );
}

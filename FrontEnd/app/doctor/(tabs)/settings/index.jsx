import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Pressable,
  Switch,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "../../../../store/userStore";
import CustomButton from "../../../../components/customButton";
import { icons } from "../../../../constants";
import { useEffect } from "react";
import { useColorScheme } from "nativewind";
import SettingSection from "../../../../components/settingsSection";

export default function Settings() {
  const router = useRouter();
  const { user, logout } = useUserStore();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme == "dark";
  const isAndroid = Platform.OS == "android";
  const statusBarHeight = StatusBar.currentHeight;
  useEffect(() => {
    if (!user) router.replace("/sign-in");
  }, [user]);
  return (
    <SafeAreaView
      className={`flex-1 bg-background-light  ${
        isDark && "bg-background-dark"
      }`}
      style={{ paddingTop: isAndroid ? statusBarHeight : "" }}
    >
      <ScrollView>
        <View className={` justify-center items-center`}>
          {/* Header*/}
          <View className="items-center gap-2">
            <Image
              className="w-20 h-20 rounded-full"
              resizeMode="cover"
              source={
                // { uri: user?.ProfilePicture } ||
                {
                  uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
                }
              }
            />
            <Text className={`font-pbold text-xl ${isDark && "text-white"}`}>
              {user?.name || "username"}
            </Text>
            <TouchableOpacity
              className="p-3 bg-primary rounded-3xl"
              onPress={() => router.push("patient/(tabs)/settings/profile")}
            >
              <Text className="text-white">Edit profile</Text>
            </TouchableOpacity>
          </View>
          {/* Options menu*/}
          <View className="w-[90%] mx-2 my-8 gap-2 ">
            <Text
              className={`font-psemibold text-lg ${isDark && "text-white"}`}
            >
              Account
            </Text>
            <View
              className={`shadow-md rounded-3xl p-2 bg-gray-light ${
                isDark && "bg-gray-dark"
              }`}
            >
              <SettingSection
                title={"Adress information"}
                Icon={icons.location}
                isDark={isDark}
              />
              <SettingSection
                title={"Payment Information"}
                Icon={icons.wallet}
                isDark={isDark}
              />
              <SettingSection
                title={"Notifications"}
                Icon={icons.notification}
                isDark={isDark}
              />
              <SettingSection
                title={"Privacy and security"}
                Icon={icons.privacy_lock}
                isDark={isDark}
                isLast={true}
              />
            </View>
          </View>
          <View className="mx-2 w-[90%]  gap-2">
            <Text
              className={`font-psemibold text-lg ${isDark && "text-white"}`}
            >
              General
            </Text>
            <View
              className={` rounded-3xl p-2 shadow-md ${
                isDark ? "bg-gray-dark" : "bg-gray-light"
              }`}
            >
              <SettingSection
                title={"Language"}
                Icon={icons.globe}
                isDark={isDark}
              />
              <View className="flex-row items-center justify-between p-2">
                <View className="flex-row items-center gap-2">
                  <Image
                    source={icons.moon}
                    resizeMode="contain"
                    className="h-6 w-6"
                    tintColor={isDark ? "white" : "black"}
                  />
                  <Text className={`${isDark && "text-white"}`}>Dark mode</Text>
                </View>

                <Switch
                  value={colorScheme == "dark" ? true : false}
                  onValueChange={toggleColorScheme}
                />
              </View>
            </View>
          </View>
          {/*Footer */}
          <View className="w-[90%] ">
            <CustomButton
              title="Log out"
              containerStyles="bg-primary rounded-3xl"
              textStyles="text-white"
              handlePress={() => {
                logout();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

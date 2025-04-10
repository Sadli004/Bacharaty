import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Pressable,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "../../../../store/userStore";
import CustomButton from "../../../../components/customButton";
import { icons } from "../../../../constants";

export default function Settings() {
  const router = useRouter();
  const { user, logout } = useUserStore();
  return (
    <View className="flex-1 justify-center items-center bg-[#f9f9f9]">
      {/* Header*/}
      <View className="items-center gap-2">
        <Image
          className="w-20 h-20 rounded-full"
          resizeMode="cover"
          source={{
            uri:
              user?.profilePicUri ||
              "https://randomuser.me/api/portraits/men/20.jpg",
          }}
        />
        <Text className="font-pbold text-xl">{user?.name}</Text>
        <TouchableOpacity
          className="p-3 bg-primary rounded-3xl"
          onPress={() => router.push("doctor/(tabs)/settings/profile")}
        >
          <Text className="text-white">Edit profile</Text>
        </TouchableOpacity>
      </View>
      {/* Options menu*/}
      <View className="w-[90%] mx-2 my-8 gap-2 ">
        <Text className="font-psemibold text-lg">Account</Text>
        <View className=" shadow-md rounded-3xl p-2 bg-lgray">
          <TouchableOpacity
            activeOpacity={0.5}
            className="flex-row items-center justify-between p-2 "
          >
            <View className="flex-row items-center gap-2">
              <Image
                source={icons.location}
                resizeMode="contain"
                className="h-6 w-6"
              />
              <Text>Adress information</Text>
            </View>
            <Image
              source={icons.rightArrow}
              className="h-6 w-6"
              resizeMode="contain"
              tintColor="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            className="flex-row items-center justify-between p-2 "
          >
            <View className="flex-row items-center gap-2">
              <Image
                source={icons.wallet}
                resizeMode="contain"
                className="h-6 w-6"
              />
              <Text>Payment information</Text>
            </View>

            <Image
              source={icons.rightArrow}
              className="h-6 w-6"
              resizeMode="contain"
              tintColor="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            className="flex-row items-center justify-between p-2 "
          >
            <View className="flex-row items-center gap-2">
              <Image
                source={icons.notification}
                resizeMode="contain"
                className="h-6 w-6"
              />
              <Text>Notifications</Text>
            </View>

            <Image
              source={icons.rightArrow}
              className="h-6 w-6"
              resizeMode="contain"
              tintColor="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            className="flex-row items-center justify-between p-2 "
          >
            <View className="flex-row items-center gap-2">
              <Image
                source={icons.privacy_lock}
                resizeMode="contain"
                className="h-6 w-6"
              />
              <Text>Privacy & Security</Text>
            </View>

            <Image
              source={icons.rightArrow}
              className="h-6 w-6"
              resizeMode="contain"
              tintColor="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mx-2 w-[90%] my-4 gap-2">
        <Text className="font-psemibold text-lg">General</Text>
        <View className=" rounded-3xl p-2 shadow-md bg-lgray">
          <TouchableOpacity
            activeOpacity={0.5}
            className="flex-row items-center justify-between p-2"
          >
            <View className="flex-row items-center gap-2">
              <Image
                source={icons.globe}
                resizeMode="contain"
                className="h-6 w-6"
              />
              <Text>Language</Text>
            </View>

            <Image
              source={icons.rightArrow}
              className="h-6 w-6"
              resizeMode="contain"
              tintColor="black"
            />
          </TouchableOpacity>
          <View className="flex-row items-center justify-between p-2">
            <View className="flex-row items-center gap-2">
              <Image
                source={icons.moon}
                resizeMode="contain"
                className="h-6 w-6"
              />
              <Text>Dark mode</Text>
            </View>

            <Switch />
          </View>
        </View>
      </View>
      {/*Footer */}
      <View className="w-[90%] ">
        <CustomButton
          title="Log out"
          containerStyles="bg-primary rounded-3xl"
          textStyles="text-white"
          handlePress={() => logout()}
        />
      </View>
    </View>
  );
}

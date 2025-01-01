import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { images } from "../../../constants";
import CustomButton from "../../../components/customButton";

const Settings = () => {
  return (
    <SafeAreaView className="flex-column h-full">
      <ScrollView>
        <View className="items-center justify-center ">
          <Image
            source={images.doctor}
            className="rounded-full w-20 h-20 mb-2"
          />
          <Text>Rania Mahani</Text>
          <Text>@Rania</Text>
          <CustomButton title="Edit profile" />
        </View>
        <View className="m-2 ">
          <Text className="text-xl font-psemibold mb-2">Account</Text>
          <View className="bg-slate-200 p-2">
            <Text className="text-lg ">Account Settings</Text>
            <Text className="text-lg ">Adress Information</Text>
            <Text className="text-lg ">Payment Information</Text>
            <Text className="text-lg ">Notifications</Text>
            <Text className="text-lg ">Privacy & Security</Text>
          </View>
        </View>
        <View className="m-2 ">
          <Text className="text-xl font-psemibold mb-2">General</Text>
          <View className="bg-slate-200 p-2">
            <Text className="text-lg">Language</Text>
            <Text className="text-lg">Theme and Display</Text>
          </View>
        </View>
        <View className="m-2 ">
          <Text className="text-xl font-psemibold mb-2">Help & Support</Text>
          <View className="bg-slate-200 p-2">
            <TouchableOpacity>
              <Text className="text-lg">FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-lg">Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-lg">Terms & Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-lg">Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomButton title="Sign out" containerStyles="m-2" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

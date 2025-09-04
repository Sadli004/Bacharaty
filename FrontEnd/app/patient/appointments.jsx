import {
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppointmentStore } from "../../store/appointmentStore";
import { icons, images } from "../../constants";
import CustomButton from "../../components/customButton";
import { AppDate } from "../../utils/date";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import SearchInput from "../../components/searchInput";
import { useColorScheme } from "nativewind";

export default function Appointments() {
  const [activeTab, setActiveTab] = useState(1);
  const { colorScheme } = useColorScheme();
  const isAndroid = Platform.OS == "android";
  const [showcancelConfirmation, setShowCancelConfirmation] = useState(false);
  const { fetchUserAppointment, appointments, cancelAppointment } =
    useAppointmentStore();
  useEffect(() => {
    fetchUserAppointment();
  }, []);
  return (
    <SafeAreaView
      className={`bg-background-light  dark:bg-background-dark flex-1`}
      style={{ paddingTop: isAndroid ? StatusBar.currentHeight : 0 }}
    >
      <View className="flex-row w-full items-center justify-between p-2 border-b border-gray-light bg-white mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={icons.leftArrow}
            resizeMode="contain"
            className="w-6 h-6 "
          />
        </TouchableOpacity>
        <Text className="text-lg font-pregular">My appointments</Text>
        <TouchableOpacity onPress={() => router.push("patient/(tabs)/doctor")}>
          <Image
            source={icons.plus}
            resizeMode="contain"
            className="w-6 h-6 "
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-around">
        <TouchableOpacity
          onPress={() => setActiveTab(1)}
          className={`p-2 rounded-xl light ${
            activeTab == 1 ? "bg-secondary " : "bg-gray-light"
          }`}
        >
          <Text className={`font-pregular`}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(2)}
          className={`p-2 rounded-xl light ${
            activeTab == 2 ? "bg-secondary " : "bg-gray-light"
          }`}
        >
          <Text className={`font-pregular`}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(3)}
          className={`p-2 rounded-xl light ${
            activeTab == 3 ? "bg-secondary " : "bg-gray-light"
          }`}
        >
          <Text className={`font-pregular`}>Canceled</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ gap: 10, margin: 10 }}
        renderItem={({ item }) => {
          return (
            <View className="bg-gray-light rounded-xl p-2 ">
              <View className="flex-row items-center justify-between">
                <View className="flex-row gap-2 items-center">
                  <Image
                    source={
                      item?.profilePicture
                        ? { uri: item?.profilePicture }
                        : images.profile_doc
                    }
                    resizeMode="contain"
                    className="h-16 w-16 rounded-full"
                  />
                  <View>
                    <Text className={`text-lg font-psemibold`}>
                      {item.doctor?.name || " Doctor name"}{" "}
                    </Text>
                    <Text className="text-gray-500 font-pregular">
                      Dermatologist
                    </Text>
                  </View>
                </View>
                <Image
                  source={icons.notification}
                  resizeMode="contain"
                  className="h-6 w-6"
                />
              </View>
              <View className="mt-2 mx-2">
                <View className="flex-row gap-2 items-center">
                  <Image
                    source={icons.calendar}
                    className="h-4 w-4"
                    resizeMode="contain"
                  />
                  <Text className={`font-pregular`}>{AppDate(item.date)}</Text>
                </View>
                <View className="flex-row gap-2 items-center">
                  <Image
                    source={icons.clock}
                    className="h-4 w-4"
                    resizeMode="contain"
                    tintColor={"black"}
                  />
                  <Text className={`font-pregular`}>{item.time}</Text>
                </View>
              </View>
              <View className="flex-row justify-around">
                <CustomButton
                  title="Cancel"
                  containerStyles={"bg-transparent border w-[40%] p-2"}
                  textStyles={"text-gray-dark"}
                  handlePress={() => setShowCancelConfirmation(true)}
                />
                <CustomButton
                  title="Reschedule"
                  containerStyles={"bg-secondary2 w-[40%] p-2"}
                  textStyles={"text-white"}
                />
              </View>
            </View>
          );
        }}
      />
      {/* <View className="align-end"> */}
      <Modal visible={showcancelConfirmation} transparent>
        <TouchableWithoutFeedback
          onPress={() => setShowCancelConfirmation(false)}
        >
          <BlurView intensity={100} className="flex-1 justify-end">
            <View className="absolute bottom-0 w-full bg-white border border-gray-light rounded-t-3xl p-6 shadow-lg">
              <Text className="text-lg font-pbold">Cancel Appointment ? </Text>
              <Text className="text-lg font-pregular">
                Are you sure you want to cancel ?
              </Text>
              <View className="flex-row justify-around space-x-2">
                <CustomButton
                  title={"Back"}
                  containerStyles={"bg-transparent border w-[40%] mr-2 p-2"}
                  textStyles={"text-black"}
                  handlePress={() => setShowCancelConfirmation(false)}
                />
                <CustomButton
                  title={"Yes Cancel"}
                  containerStyles={" w-[40%] p-2 bg-secondary2"}
                />
              </View>
            </View>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppointmentStore } from "../../store/appointmentStore";
import { icons, images } from "../../constants";
import CustomButton from "../../components/customButton";
import { AppDate } from "../../utils/date";

export default function Appointments() {
  const [activeTab, setActiveTab] = useState(1);
  const { fetchUserAppointment, appointments } = useAppointmentStore();
  useEffect(() => {
    fetchUserAppointment();
  }, []);
  return (
    <SafeAreaView className="bg-background-light h-full">
      <View className="flex-row justify-around">
        <TouchableOpacity
          onPress={() => setActiveTab(1)}
          className={`p-2 rounded-xl light ${
            activeTab == 1 ? "bg-secondary " : "bg-gray-light"
          }`}
        >
          <Text>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(2)}
          className={`p-2 rounded-xl light ${
            activeTab == 2 ? "bg-secondary " : "bg-gray-light"
          }`}
        >
          <Text>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(3)}
          className={`p-2 rounded-xl light ${
            activeTab == 3 ? "bg-secondary " : "bg-gray-light"
          }`}
        >
          <Text>Canceled</Text>
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
                    source={images.profile_doc}
                    resizeMode="contain"
                    className="h-16 w-16 rounded-full"
                  />
                  <View>
                    <Text>Doctor name</Text>
                    <Text className="text-gray-500">Dermatologist</Text>
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
                  <Text>{AppDate(item.date)}</Text>
                </View>
                <View className="flex-row gap-2 items-center">
                  <Image
                    source={icons.calendar}
                    className="h-4 w-4"
                    resizeMode="contain"
                  />
                  <Text>{AppDate(item.date)}</Text>
                </View>
              </View>
              <View className="flex-row justify-around">
                <CustomButton
                  title="Cancel"
                  containerStyles={"bg-transparent border w-[40%] p-2"}
                  textStyles={"text-gray-dark"}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

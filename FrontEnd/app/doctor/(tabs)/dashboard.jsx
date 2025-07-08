import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../../constants";
import { useUserStore } from "../../../store/userStore";
import { useAppointmentStore } from "../../../store/appointmentStore";
import { AppDate } from "../../../utils/date";
import CustomButton from "../../../components/customButton";
import { router } from "expo-router";
const Dashboard = () => {
  const { fetchDoctorAppointments, appointments } = useAppointmentStore();
  const { user } = useUserStore();
  useEffect(() => {
    fetchDoctorAppointments();
  }, []);
  useEffect(() => {
    if (!user) router.replace("/sign-in");
  }, [user]);
  return (
    <View className="flex-1  p-2 bg-background-light">
      {/* Doctor Profile */}
      <SafeAreaView className="flex-row items-center  justify-between">
        <View className="flex-row items-center">
          <Image
            source={{ uri: user?.profilePicture }}
            className="w-16 h-16 rounded-full border border-dark"
          />
          <View className="ml-4">
            <Text className="text-gray-500 text-lg">Hello,</Text>
            <Text className="text-xl font-psemibold">{user?.name}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity>
            <Image
              source={images.logo_horizontal}
              resizeMode="contain"
              className="w-24 h-20 "
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Next Appointment */}
      <Text className="text-xl font-pbold mb-2">Next appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        horizontal
        contentContainerStyle={{
          gap: 10,
          marginBottom: 20,
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity className="bg-gray-light p-4 rounded-xl  ">
              <View className="flex-row items-center">
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/32.jpg",
                  }}
                  className="w-16 h-16 rounded-full mr-3"
                />
                <View>
                  <Text className="text-lg font-psemibold">
                    {item?.patient?.name || "Abdellah"}
                  </Text>
                  <Text className="text-gray-500">{AppDate(item?.date)}</Text>
                  <Text className="text-gray-500">{item?.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* Recent Section */}
      {/* <View className="bg-white p-4 rounded-xl shadow mb-4">
        <Text className="text-lg font-bold mb-2">Recent</Text>
        <TouchableOpacity className="flex-row items-center p-2 rounded-xl bg-gray-100 mb-2">
          <FontAwesome
            name="paper-plane"
            size={18}
            color="lightblue"
            className="mr-2"
          />
          <Text className="text-gray-700 ml-2">New messages from Rania</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-2 rounded-xl bg-gray-100">
          <MaterialIcons
            name="event"
            size={18}
            color="black"
            className="mr-2"
          />
          <Text className="text-gray-700 ml-2">New appointment</Text>
        </TouchableOpacity>
      </View> */}

      {/* Today's Schedule */}
      <View className="flex-row justify-between">
        <Text className="text-lg font-pbold mb-2 ">Upcoming Appointments</Text>
        <Text>View All</Text>
      </View>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View>
            <Text>Empty</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-xl shadow mb-3 flex-row items-center">
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <View className="flex-1">
              {/* <Text className="font-bold">Patient info</Text> */}
              <Text className="font-psemibold text-lg">
                {item.patient?.name || "Abdellah"}
              </Text>
              <Text className="text-gray-500">{AppDate(item.date)}</Text>
              <Text className="text-gray-500">{item.time}</Text>
            </View>
            <TouchableOpacity onPress={console.log("redirect to chat")}>
              <Image
                source={icons.chat}
                resizeMode="contain"
                tintColor="#1c5c73"
                className="h-6 w-6 color-dark"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Dashboard;

import React from "react";
import { View, Text, Image } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

const TimeLine = ({ time, patient, type, duration, status }) => {
  return (
    <View className="flex-row items-center mb-4 px-2 flex-1 gap-2 mx-2">
      {/* Time */}
      <View className=" border-r ">
        <Text className="text-gray-500 font-semibold w-[80px]">{time}</Text>
      </View>

      {/* Appointment Card */}
      <View
        className={`flex-1 p-4 rounded-lg shadow-md bg-white ${
          type === "Zoom" ? "bg-yellow-100" : "bg-gray-100"
        }`}
      >
        {/* Header: Profile Image & Name */}
        <View className="flex-row items-center">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            className="w-10 h-10 rounded-full mr-3"
          />

          <View className="flex-1">
            <Text className="text-lg font-semibold">Abdellah</Text>
            <Text className="text-gray-500">Video</Text>
          </View>

          {/* Status Icon */}
          {status === "completed" ? (
            <FontAwesome name="check-circle" size={20} color="green" />
          ) : (
            <Feather name="clock" size={20} color="gray" />
          )}
        </View>

        {/* Time Range */}
        <Text className="text-gray-500 mt-2">30 min</Text>
      </View>
    </View>
  );
};

export default TimeLine;

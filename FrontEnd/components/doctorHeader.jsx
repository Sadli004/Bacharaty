// components/DoctorHeader.jsx
import { View, Text, Image, TouchableOpacity } from "react-native";
import { images, icons } from "../constants";

const DoctorHeader = ({ doctor, tab, setTab }) => {
  return (
    <>
      <View className="items-center p-4">
        <Image
          source={
            doctor?.profilePicture
              ? { uri: doctor.profilePicture }
              : images.profile
          }
          className="w-28 h-28 rounded-full border-2 border-dark"
          resizeMode="cover"
        />
        <Text className="mt-2 text-3xl font-psemibold text-gray-800">
          {doctor?.name || "Doctor Name"}
        </Text>
        <Text className="text-sm text-gray-500">Dermatologist</Text>
      </View>

      <View className="flex-column gap-2 justify-around p-4">
        <View className="p-2 rounded-xl shadow-lg bg-white justify-between flex-row">
          <View className="border-r flex-1 mr-4 items-center flex-row gap-2">
            <Image source={icons.expertise} className="h-6 w-6" />
            <View className="items-center">
              <Text className="text-sm font-bold text-gray-800">
                +{doctor?.experience || 0}
              </Text>
              <Text className="text-xs text-gray-500">Experience</Text>
            </View>
          </View>
          <View className="items-center flex-row">
            <Image source={icons.star} className="h-5 w-5" tintColor="orange" />
            <View className="items-start mx-3">
              <Text className="text-sm font-bold text-gray-800">4.8</Text>
              <Text className="text-xs text-gray-500">Rating</Text>
            </View>
          </View>
        </View>

        <View className="p-2 rounded-xl shadow-lg bg-white flex-row items-center">
          <Image source={icons.money} className="h-6 w-6" />
          <View className="items-start mx-3">
            <Text className="text-sm font-bold text-gray-800">
              {doctor?.feePerConsultation || "0 DZD"}
            </Text>
            <Text className="text-xs text-gray-500">Consultation Fee</Text>
          </View>
        </View>
      </View>

      <View className="flex-row space-x-4">
        {["About", "Availability"].map((item) => (
          <TouchableOpacity
            key={item}
            className={`border-b-[4px] ${
              tab === item ? "border-dark" : "border-gray-light"
            }`}
            onPress={() => setTab(item)}
          >
            <Text className="text-xl">{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default DoctorHeader;

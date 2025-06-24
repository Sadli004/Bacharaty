import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { useEffect } from "react";
import { icons, images } from "../../../constants";
import { router } from "expo-router";
import SearchInput from "../../../components/searchInput";
import { TouchableOpacity } from "react-native";
import { useDoctorStore } from "../../../store/doctorStore";

const Doctor = () => {
  const { fetchDoctors, doctors, getDoctorProfile, doctor } = useDoctorStore();
  const isAndroid = Platform.OS == "android";
  const statusBarHeight = StatusBar.currentHeight;
  useEffect(() => {
    fetchDoctors();
  }, []);

  const myp = "#D6F0F3";

  return (
    <View className="flex-1 bg-background-light">
      {/* Header */}
      <SafeAreaView
        className="  mb-4 bg-transparent"
        style={{ paddingTop: isAndroid ? statusBarHeight : 0 }}
      >
        <View className="p-2 ">
          <Text className="font-psemibold text-xl mb-2 mx-2">Doctors</Text>
          <SearchInput otherStyles="rounded-3xl bg-[#f9f9f9] border-dark focus:border-dactive " />
        </View>
      </SafeAreaView>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                getDoctorProfile(item._id);
                router.push(`patient/doctor/${doctor._id}`);
              }}
              className=" bg-gray-light shadow-sm   p-2 m-1 mx-2 rounded-xl flex-row items-center h-[100px] overflow-hidden"
            >
              <Image
                source={images.profile_doc || item.profilePicture}
                resizeMode="cover"
                className="h-16 w-16 rounded-full border border-white mr-3"
              />
              <View className="m-2 flex-shrink">
                <Text className="font-psemibold text-xl">{item.name}</Text>
                <Text>Location : {item.location}</Text>
                <Text>{item.experience} of experience</Text>
                <View className="flex-row items-center">
                  <Text>Rating: 4.9 </Text>
                  <Image
                    source={icons.star}
                    className="h-4 w-4"
                    resizeMode="contain"
                    tintColor="orange"
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Doctor;

import { View, Text, FlatList, SafeAreaView, Image } from "react-native";
import React from "react";
import { icons, images } from "../../constants";
import { Link, router } from "expo-router";
import CustomButton from "../../components/customButton";
import { TouchableOpacity } from "react-native";
const Doctor = () => {
  const doctorsData = [
    {
      id: 1,
      Name: "Dr. Salah",
      Location: "Algiers, Algiers Province",
      Education: "MD, Harvard Medical School",
      Rating: 4.9,
    },
    {
      id: 2,
      Name: "Dr. Emily Chen",
      Location: "Oran, Oran Province",
      Education: "DO, University of Southern California",
      Rating: 4.8,
    },
    {
      id: 3,
      Name: "Dr. John Smith",
      Location: "Constantine, Constantine Province",
      Education: "MD, Johns Hopkins University",
      Rating: 4.7,
    },
    {
      id: 4,
      Name: "Dr. Maria Garcia",
      Location: "Tlemcen, Tlemcen Province",
      Education: "MD, Stanford University",
      Rating: 4.6,
    },
    {
      id: 5,
      Name: "Dr. Aisha Khan",
      Location: "Annaba, Annaba Province",
      Education: "MD, University of Miami",
      Rating: 4.5,
    },
    {
      id: 6,
      Name: "Dr. David Lee",
      Location: "Blida, Blida Province",
      Education: "MD, University of California, San Francisco",
      Rating: 4.8,
    },
    {
      id: 7,
      Name: "Dr. Sarah Johnson",
      Location: "Biskra, Biskra Province",
      Education: "MD, University of Washington",
      Rating: 4.7,
    },
    {
      id: 8,
      Name: "Dr. Alex Brown",
      Location: "Setif, Setif Province",
      Education: "MD, Boston University",
      Rating: 4.6,
    },
    {
      id: 9,
      Name: "Dr. Rachel Adams",
      Location: "Tizi Ouzou, Tizi Ouzou Province",
      Education: "MD, University of Pennsylvania",
      Rating: 4.9,
    },
    {
      id: 10,
      Name: "Dr. Michael Wilson",
      Location: "Sidi Bel Abbes, Sidi Bel Abbes Province",
      Education: "MD, University of Arizona",
      Rating: 4.5,
    },
  ];
  return (
    <SafeAreaView className="h-full">
      <FlatList
        data={doctorsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push("doctor/[id]")}
            className="shadow-md bg-white border border-primary p-2 m-2 rounded-xl flex-row items-center h-[100px] overflow-hidden"
          >
            <Image
              source={images.doctor}
              resizeMode="cover"
              className="h-12 w-12 rounded-xl"
            />
            <View className="m-2 flex-shrink">
              <Text className="font-psemibold text-xl">{item.Name}</Text>
              <Text>Location : {item.Location}</Text>
              <Text>Education: 10 and d'experiance</Text>
              <Text className="">
                Rating: {item.Rating}{" "}
                <Image
                  source={icons.star}
                  className="h-4 w-4"
                  resizeMode="contain"
                  tintColor="orange"
                />
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Doctor;

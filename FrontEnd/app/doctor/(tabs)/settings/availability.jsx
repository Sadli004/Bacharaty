import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { days } from "../../../../utils/date";
import { icons } from "../../../../constants";
import CustomButton from "../../../../components/customButton";

const Availability = () => {
  const [selectedTab, setSelectedTab] = useState(2);
  return (
    <SafeAreaView className={`h-full bg-background-light`}>
      <View className="flex-row justify-around border-b border-gray-400 mt-2">
        <Pressable
          onPress={() => setSelectedTab(1)}
          className={`text-sm  pb-2 ${
            selectedTab == 1 && "border-b border-dark"
          }`}
        >
          <Text>Weekly Hours</Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedTab(2)}
          className={`text-sm  pb-2 ${
            selectedTab == 2 && "border-b border-dark"
          }`}
        >
          <Text>Date specific hours</Text>
        </Pressable>
      </View>
      {selectedTab == 1 && (
        <>
          <View className="items-center">
            <View className={`my-4 flex-row`}>
              {days.map((day, index) => {
                return (
                  <View
                    className={`rounded-full bg-gray-light w-[45px] h-[45px] items-center justify-center`}
                  >
                    <Text className={`text-sm`}>{day}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View className={`mx-4 my-8`}>
            <View className={`flex-row items-center gap-8`}>
              <Text>Sunday</Text>
              <View className={`border border-gray-400 py-2 px-6 rounded-lg`}>
                <Text>09:00 - 17:00</Text>
              </View>
              <Image
                source={icons.plus}
                resizeMode="contain"
                tintColor="gray"
                className={`h-6 w-6 `}
              />
            </View>
          </View>
        </>
      )}
      <View className={`flex-row justify-between mx-2`}>
        <CustomButton
          title={"Cancel"}
          textStyles={"text-black"}
          containerStyles={
            "flex-1 w-[45%] mr-2 bg-transparent border  border-dark"
          }
        />
        <CustomButton title={"Save"} containerStyles={"flex-1 w-[45%]"} />
      </View>
    </SafeAreaView>
  );
};

export default Availability;

import {
  View,
  Text,
  Pressable,
  Image,
  Switch,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { days } from "../../../../utils/date";
import { icons } from "../../../../constants";
import CustomButton from "../../../../components/customButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";

const Availability = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [sameHours, setSameHours] = useState(true);
  const [showHoursModel, setShowHoursModel] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
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
          <View
            className={`flex-row items-center border-y border-gray-300 py-2 my-6 justify-between`}
          >
            <Text className={`mx-4 `}>Use same hours for all week</Text>
            <Switch
              value={sameHours}
              onValueChange={() => setSameHours(!sameHours)}
            />
          </View>
          <View className={`mx-4 my-8`}>
            <View className={`flex-row items-center gap-8`}>
              <Text>Hours</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowHoursModel(true);
                  console.log(showHoursModel);
                }}
                className={`border border-gray-400 py-2 px-6 rounded-lg`}
              >
                <Text>09:00 - 17:00</Text>
              </TouchableOpacity>
              <Image
                source={icons.plus}
                resizeMode="contain"
                tintColor="gray"
                className={`h-6 w-6 `}
              />
            </View>
          </View>
          <Modal transparent visible={showHoursModel}>
            <BlurView className={`flex-1 justify-end `} intensity={0}>
              <View className="absolute bottom-0 w-full bg-[#fefefe] border border-gray-300 rounded-t-3xl  shadow-lg">
                <View
                  className={`items-center bg-gray-light flex-row justify-between `}
                >
                  <View className={`items-center  `}>
                    <Text>Start Time</Text>
                    <Text>9:00</Text>
                  </View>
                  <View className={`items-center`}>
                    <Text>End Time</Text>
                    <Text>17:00</Text>
                  </View>
                </View>
                <View>
                  <DateTimePicker
                    value={selectedDay}
                    mode="time"
                    display="spinner"
                    design="material"
                  />
                </View>
                <View className={`m-6`}>
                  <CustomButton title={"Use these times"} />
                  <CustomButton
                    title={"Cancel"}
                    containerStyles={" "}
                    handlePress={() => setShowHoursModel(false)}
                  />
                </View>
              </View>
            </BlurView>
          </Modal>
        </>
      )}
      <View className={`justify-end flex-1 mb-4`}>
        <View className={`flex-row  mx-2 `}>
          <CustomButton
            title={"Cancel"}
            textStyles={"text-black"}
            containerStyles={
              "flex-1 w-[45%] mr-2 bg-transparent border  border-dark"
            }
          />
          <CustomButton title={"Save"} containerStyles={"flex-1 w-[45%]"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Availability;

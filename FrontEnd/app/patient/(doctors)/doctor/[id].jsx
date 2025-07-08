import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { icons, images } from "../../../../constants";
import CustomButton from "../../../../components/customButton";
import BookingCalendar from "../../../../components/bookingCalendar";
import { useDoctorStore } from "../../../../store/doctorStore";
import { useChatStore } from "../../../../store/chatStore";
import { useUserStore } from "../../../../store/userStore";
import { formatDate, getWeekDays } from "../../../../utils/date";
import DayPicker from "../../../../components/dayPicker";
import DoctorHeader from "../../../../components/doctorHeader";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import { useAppointmentStore } from "../../../../store/appointmentStore";
const Docotor = () => {
  const { user } = useUserStore();
  const { id } = useLocalSearchParams();
  const { doctor, getDoctorProfile } = useDoctorStore();
  const { startNewChat } = useChatStore();
  const { chats, chatId } = useChatStore();
  const { bookAppointment } = useAppointmentStore();
  const [tab, setTab] = useState("About");
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [week, setWeek] = useState(getWeekDays(selectedDay));
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const allowBooking = selectedDay && selectedTime;
  const times = [
    { id: 1, time: "08:00 AM" },
    { id: 2, time: "08:30 AM" },
    { id: 3, time: "09:00 AM" },
    { id: 4, time: "10:00 AM" },
    { id: 5, time: "10:30 AM" },
    { id: 6, time: "11:00 AM" },
  ];
  const handleStartChat = async () => {
    if (chats.length != 0) {
      const existingChat = chats.find(
        (chat) => chat.receiver._id == doctor._id
      );

      if (existingChat) router.replace(`patient/${existingChat.chatId._id}`);
    } else {
      const newChatId = await startNewChat(user._id, doctor._id);
      if (newChatId) router.replace(`patient/${newChatId}`);
    }
  };
  const handleBooking = (doctorId, date, time) => {
    bookAppointment(doctorId, date, time);
  };
  const headerComponent = () => (
    <>
      <DoctorHeader doctor={doctor} tab={tab} setTab={setTab} />
      {tab === "About" ? (
        <View className="p-4">
          <Text className="text-lg font-pbold text-gray-800 mb-1">
            About Me
          </Text>
          <Text className="text-gray-600">
            I am {doctor?.name}, a specialist in dermatology for over 10 years,
            based in Algiers.
          </Text>
          <Text className="text-lg font-pbold text-gray-800 mt-4 mb-1">
            Reviews
          </Text>
        </View>
      ) : (
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-psemibold">
              {formatDate(selectedDay)}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={icons.calendar} className="w-6 h-6" />
            </TouchableOpacity>
          </View>

          <DayPicker
            week={week}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
          <View>
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              className="rounded-xl"
            >
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <BlurView intensity={10} className="flex-1">
                  <View className="flex-1 justify-center items-center mx-6">
                    <DateTimePicker
                      value={selectedDay}
                      mode="date"
                      display="inline"
                      accentColor="#1c5c73"
                      themeVariant="light"
                      minimumDate={new Date()}
                      onChange={(event, selectedDate) => {
                        setSelectedDay(selectedDate);
                        setWeek(getWeekDays(new Date()));
                        setModalVisible(false);
                      }}
                      style={{
                        backgroundColor: "white",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </BlurView>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        </View>
      )}
    </>
  );

  const renderItem = ({ item }) => {
    if (tab === "About") {
      return (
        <Text className="text-gray-700 text-base mx-4 mt-1">
          Review {item.id}
        </Text>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => setSelectedTime(item.time)}
          className={`items-center justify-center p-3 my-3 w-[28vw] rounded-md ${
            selectedTime === item.time ? "bg-dark" : "bg-gray-light"
          }`}
        >
          <Text className="text-white font-bold">{item.time}</Text>
        </TouchableOpacity>
      );
    }
  };
  const reviews = [{ id: 1 }, { id: 2 }, { id: 3 }];
  useEffect(() => {
    getDoctorProfile(id);
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-background-light">
      {tab == "About" ? (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={headerComponent}
          renderItem={renderItem}
        />
      ) : (
        <FlatList
          data={times}
          key={tab}
          numColumns={3}
          columnWrapperStyle={
            tab == "Availability" && {
              justifyContent: "space-around",
            }
          }
          keyExtractor={(item) => item.id}
          ListHeaderComponent={headerComponent}
          renderItem={renderItem}
        />
      )}
      <CustomButton
        title="Book now"
        containerStyles={`${
          allowBooking ? "bg-primary" : "bg-secondary"
        } rounded-3xl mx-4`}
        handlePress={() => {
          bookAppointment(doctor._id, selectedDay, selectedTime);
        }}
      />
    </SafeAreaView>
  );
};

export default Docotor;

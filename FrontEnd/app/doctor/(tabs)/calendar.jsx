import {
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  StatusBar,
} from "react-native";
import { useUserStore } from "../../../store/userStore";
import DatePicker from "react-native-modern-datepicker";
import { icons } from "../../../constants";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
// import Timeline from "react-native-timeline-flatlist";
import TimeLine from "../../../components/Timeline";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAppointmentStore } from "../../../store/appointmentStore";
import { formatDate, formatTime, getWeekDays } from "../../../utils/date";
export default function Tab() {
  const { fetchDoctorAppointments, appointments } = useAppointmentStore();
  const { user } = useUserStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [week, setWeek] = useState(getWeekDays(selectedDay));
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    fetchDoctorAppointments();
  }, [selectedDay]);
  return (
    <View className="flex-1 bg-gray-100 p-2 bg-background-light">
      {/* Doctor Profile */}
      <SafeAreaView className="flex-row items-center mb-8 mx-2">
        <Image
          source={{ uri: user?.profilePicture }}
          className="w-16 h-16 rounded-full border-2 border-primary"
        />
        <View className="ml-4">
          <Text className="text-lg font-pbold">{user?.name}</Text>
          <Text className="text-gray-500">Dermatologist</Text>
        </View>
      </SafeAreaView>
      {/*Schedule */}
      <Text className="font-pbold text-xl mb-2">Schedule</Text>
      <View className=" py-4 px-2 rounded-lg shadow-xl bg-white mb-8">
        <View className="flex-row justify-between items-center mt-2 mb-4">
          <View className="flex-row gap-2">
            <TouchableOpacity className="text-white bg-primary p-2 rounded-lg shadow">
              <Text className="text-md font-pregular text-white">
                This week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              className={
                isSelected
                  ? ` bg-primary p-2 rounded-lg shadow`
                  : ` border border-primary bg-gray-100 shadow p-2 rounded-lg`
              }
            >
              <Text className="text-md font-pregular text-primary">
                Calendar
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Image source={icons.edit} resizeMode="cover" className="w-6 h-6" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={week}
          extraData={week}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const isActive = selectedDay.getDate() == item.date;

            return (
              <TouchableOpacity
                onPress={() => setSelectedDay(item.current)}
                className={`rounded-3xl shadow-sm  mr-2 p-2 h-[70px] w-[47px] items-center ${
                  isActive ? "bg-primary" : "bg-secondary"
                }`}
              >
                <Text className={`${isActive ? "text-white" : "text-black"}`}>
                  {item.day}
                </Text>
                <View
                  className={`rounded-full  p-1 bg-white ${
                    isActive ? "border-primary" : "border-secondary"
                  }`}
                >
                  <Text>{item.date <= 9 ? `0` + item.date : item.date}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

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
                  accentColor="lightblue"
                  onChange={(event, selectedDate) => {
                    setSelectedDay(selectedDate);
                    setWeek(getWeekDays(new Date()));
                    setModalVisible(false);
                  }}
                  style={{
                    backgroundColor: "gray",
                    borderRadius: 10,
                    color: "black",
                  }}
                />
              </View>
            </BlurView>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      {/*Appointments List */}
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <View className="mb-4 mx-2">
            <Text className="font-pbold text-xl">
              {selectedDay.setHours(0, 0, 0, 0) ==
              new Date().setHours(0, 0, 0, 0)
                ? "Today"
                : formatDate(selectedDay)}
            </Text>
          </View>
        }
        renderItem={({ item }) => <TimeLine {...item} />}
        ListEmptyComponent={
          <View className="min-h-[70%]">
            <Text>No appointments yet for {selectedDay}</Text>
          </View>
        }
      />
      {/* <TimeLine data={appointments} title /> */}
      <StatusBar barStyle="dark-content" />
    </View>
  );
}

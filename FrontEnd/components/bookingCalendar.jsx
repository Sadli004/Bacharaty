import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import dayjs from "dayjs"; // Install with `npm install dayjs`
import { icons } from "../constants/";
const CustomCalendar = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  ); // Default to today
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  //  const [week, setWeek] = useState(getWeekDays(selectedDay));
  const times = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
  ];
  const generateDates = (month) => {
    const startDate = month.startOf("month"); // Start of the month
    const endDate = month.endOf("month"); // End of the month
    const tempDates = [];

    for (
      let day = startDate;
      day.isBefore(endDate) || day.isSame(endDate);
      day = day.add(1, "day")
    ) {
      tempDates.push({
        day: day.format("ddd").toUpperCase(), // Short weekday name
        date: day.format("D"), // Day of the month
        fullDate: day.format("YYYY-MM-DD"), // Full date format
      });
    }

    setDates(tempDates);
  };
  // Generate the next 5 days dynamically
  useEffect(() => {
    generateDates(currentMonth);
  }, [currentMonth]);

  return (
    <View className="flex-1 p-6">
      {/* Date Selector */}
      <View className="flex-row justify-between items-center">
        <Text className=" text-lg font-psemibold mb-2">Date</Text>
        <View>
          <Text className="text-md font-psemibold mb-2 flex-end">
            {currentMonth.format("MMMM")}
          </Text>
        </View>
      </View>

      <FlatList
        data={dates}
        horizontal
        keyExtractor={(item) => item.fullDate}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(item.fullDate)}
            className={`items-center justify-center p-3 mx-2 rounded-md ${
              selectedDate === item.fullDate ? "bg-primary" : "bg-lactive"
            }`}
          >
            <Text className="text-white text-sm">{item.day}</Text>
            <Text className="text-white font-bold">{item.date}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Time Selector */}
      <Text className=" text-lg font-bold mt-6 mb-2">Available time</Text>
      <FlatList
        data={times}
        numColumns={3}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedTime(item)}
            className={`items-center justify-center p-3 m-2 w-[30%] rounded-md ${
              selectedTime === item ? "bg-primary" : "bg-lactive"
            }`}
          >
            <Text className="text-white font-bold">{item}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CustomCalendar;

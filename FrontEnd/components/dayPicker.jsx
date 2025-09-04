import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

export default function DayPicker({ week, selectedDay, setSelectedDay }) {
  return (
    <FlatList
      data={week}
      keyExtractor={(item) => item.day}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const isActive = selectedDay.getDate() == item.date;

        return (
          <TouchableOpacity
            onPress={() => setSelectedDay(item.current)}
            className={`rounded-3xl shadow-sm mt-3 mr-2 p-2 h-[60px] w[60px] items-center ${
              isActive ? "bg-dark" : "bg-gray-light"
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
  );
}

const styles = StyleSheet.create({});

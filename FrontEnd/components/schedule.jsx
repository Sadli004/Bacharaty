import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const slotOptions = [15, 30, 45, 60]; // minutes

export default function EditSchedule({ visible, onClose, onSave }) {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [dayOff, setDayOff] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [slotDuration, setSlotDuration] = useState(30);

  const formatTime = (time) => {
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSave = () => {
    onSave({
      day: selectedDay,
      dayOff,
      start: startTime,
      end: endTime,
      slot: slotDuration,
    });
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/40 px-4">
        <View className="bg-white w-full rounded-xl p-4 space-y-4">
          <Text className="text-lg font-semibold text-black">
            Edit Schedule
          </Text>

          {/* Day Picker */}
          <View className="border border-gray-300 rounded-md">
            <Picker
              selectedValue={selectedDay}
              onValueChange={(itemValue) => setSelectedDay(itemValue)}
            >
              {days.map((day) => (
                <Picker.Item label={day} value={day} key={day} />
              ))}
            </Picker>
          </View>

          {/* Day Off Toggle */}
          <TouchableOpacity
            onPress={() => setDayOff(!dayOff)}
            className="flex-row items-center space-x-2"
          >
            <View
              className={`h-4 w-4 border border-gray-400 rounded-full ${
                dayOff ? "bg-black" : "bg-white"
              }`}
            />
            <Text className="text-black">Day Off</Text>
          </TouchableOpacity>

          {!dayOff && (
            <>
              {/* Start Time Picker */}
              <Pressable
                onPress={() => setShowStartPicker(true)}
                className="border border-gray-300 rounded-md px-4 py-2"
              >
                <Text className="text-black">
                  Start: {formatTime(startTime)}
                </Text>
              </Pressable>
              {showStartPicker && (
                <DateTimePicker
                  mode="time"
                  value={startTime}
                  is24Hour={true}
                  display="spinner"
                  onChange={(event, date) => {
                    setShowStartPicker(false);
                    if (date) setStartTime(date);
                  }}
                />
              )}

              {/* End Time Picker */}
              <Pressable
                onPress={() => setShowEndPicker(true)}
                className="border border-gray-300 rounded-md px-4 py-2"
              >
                <Text className="text-black">End: {formatTime(endTime)}</Text>
              </Pressable>
              {showEndPicker && (
                <DateTimePicker
                  mode="time"
                  value={endTime}
                  is24Hour={true}
                  display="spinner"
                  onChange={(event, date) => {
                    setShowEndPicker(false);
                    if (date) setEndTime(date);
                  }}
                />
              )}

              {/* Slot Duration Picker */}
              <View className="border border-gray-300 rounded-md">
                <Picker
                  selectedValue={slotDuration}
                  onValueChange={(value) => setSlotDuration(value)}
                >
                  {slotOptions.map((min) => (
                    <Picker.Item
                      label={`${min} mins slot`}
                      value={min}
                      key={min}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            className="bg-cyan-500 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold text-center">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

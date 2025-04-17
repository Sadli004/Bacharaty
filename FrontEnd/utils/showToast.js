import { View, Text } from "react-native";
import React from "react";
import { useToast } from "react-native-toast-notifications";

const showToast = (type, text) => {
  const toast = useToast();
  toast.show(text, {
    type: type,
    animationType: "zoom-in",
    duration: "4000",
    dangerColor: "red",
  });
};

export default showToast;

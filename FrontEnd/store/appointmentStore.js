import { create } from "zustand";
import { useUserStore } from "./userStore";
import axios from "axios";
import Config from "react-native-config";
const API_URL = "http://192.168.1.8:8082";
export const useAppointmentStore = create((set) => ({
  appointments: [],
  fetchDoctorAppointments: async () => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/appointment/doctor`
      );
      console.log(response.data);
      set({ appointments: response.data });
    } catch (error) {
      console.error(error.message);
    }
  },
}));

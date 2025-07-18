import { create } from "zustand";
import { useUserStore } from "./userStore";
import axios from "axios";
import { useErrorStore } from "./errorStore";
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
  bookAppointment: async (doctorId, date, time) => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/appointment`,
        {
          doctor: doctorId,
          date,
          time,
        }
      );
      console.log(response.data);
      useErrorStore
        .getState()
        .setError("Appointment booked succesfully", "success");
    } catch (error) {
      console.error(error.message);
      useErrorStore.getState().setError("Error booking appointment");
    }
  },
  fetchUserAppointment: async () => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/appointment/patient`
      );
      console.log(response.data);
      set({ appointments: response.data });
    } catch (error) {
      console.error(error.message);
      useErrorStore.getState().setError("Couldn't load appointments");
    }
  },
  fetchAppointmentPerDay: async (date) => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    console.log(token);
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/appointment/doctor/day?date=${date}`
      );
      // console.log(response.data);
      set({ appointments: response.data });
    } catch (error) {
      console.error(error.message);
      useErrorStore.getState().setError("Couldn't load appointments");
    }
  },
  cancelAppointment: async (id) => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.delete(
        `${process.env.EXPO_PUBLIC_API_URL}/appointment/${id}`
      );
      console.log("data" + response.data || "message" + response.messages);
      useErrorStore.getState().setError("Appointment cancelled", "Success");
    } catch (error) {
      console.log(error.message);
      useErrorStore
        .getState()
        .setError("An error occured, Couldn't cancel appointment");
    }
  },
}));

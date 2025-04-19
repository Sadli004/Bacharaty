import { create } from "zustand";
import { useUserStore } from "./userStore";
import axios from "axios";
import Config from "react-native-config";
export const useDoctorStore = create((set) => ({
  doctors: [],
  doctor: {},
  loading: true,
  fetchDoctors: async () => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/doctor`
      );
      const doctors = response.data.map((doc) => {
        return {
          _id: doc._id,
          name: doc.name,
          location: doc.location ? doc.location : "Alger",
          experience: doc.experience,
          phoneNumber: doc.phoneNumber,
          profilePicture: doc.profilePicture
            ? `${process.env.EXPO_PUBLIC_API_URL}/download/user/profile/${doc.profilePicture}`
            : null,
          feePerConsultation: doc.feePerConsultation,
        };
      });

      set({ doctors: doctors, loading: false });
    } catch (error) {
      console.error(error.message);
    }
  },
  getDoctorProfile: async (doctorId) => {
    try {
      const apiUrl = Config.API_URL;

      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/doctor/${doctorId}`
      );
      response.data.profilePicture = `${process.env.EXPO_PUBLIC_API_URL}/download/user/profile/${response.data.profilePicture}`;

      set({ doctor: response.data });
    } catch (error) {
      console.error(error.message);
    }
  },
}));

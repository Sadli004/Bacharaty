import axios from "axios";
import { create } from "zustand";
import * as SecureS from "expo-secure-store";
import showToast from "../utils/showToast";
export const useUserStore = create((set) => ({
  user: null,
  role: null,
  token: null,
  isFirstLaunch: true,
  loading: true,
  setUser: (user) => set({ user }),
  getUser: async () => {
    const token = await SecureS.getItemAsync("token");

    if (!token) {
      console.log("No token found, setting user to null.");
      set({
        user: null,
        role: null,
        token: null,
        loading: false,
      });

      return;
    }

    try {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/user/`
      );

      const profilePicUri = response.data.profilePicture
        ? `${process.env.EXPO_PUBLIC_API_URL}/download/user/profile/${response.data.profilePicture}`
        : null;
      response.data.profilePicture = profilePicUri;

      set({
        user: response.data,
        role: response.data.role,
        token: token,
        loading: false,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Get user failed:", error.response?.data || error.message);
      set({ loading: false, user: null, token: null, role: null });
    }
  },
  updateProfile: async (imageUri, formData) => {
    const data = new FormData();

    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("phoneNumber", formData.phoneNumber);

    if (imageUri) {
      const uriParts = imageUri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      data.append("file", {
        uri: imageUri,
        name: `profile.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await axios.patch(
        `${process.env.EXPO_PUBLIC_API_URL}/user`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error(
        "Profile update failed:",
        error.response?.data || error.message
      );
    }
  },

  login: async (email, password) => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/user/login`,
        {
          email: email,
          password: password,
        }
      );
      const { user, accessToken } = response.data;
      const token = accessToken;
      await SecureS.setItemAsync("token", accessToken);
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      set({ user: user, role: user.role, token: token, loading: false });
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
      throw error;
    }
  },
  registre: async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/patient`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: "Patient",
        }
      );
      console.log(response.data);
      set({
        user: response.data,
        token: response.data.token,
        role: response.data.role,
        loading: false,
      });
    } catch (error) {
      console.error(error.message);
    }
  },
  logout: async () => {
    await SecureS.deleteItemAsync("token");
    axios.defaults.headers.common["authorization"] = "";
    set({ user: null, role: null, loading: false });
  },
  // likeProduct: async (productId) => {

  //   try {
  //     axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  //     const response = await axios.post(
  //       `${process.env.EXPO_PUBLIC_API_URL}/product/like/`,
  //       {
  //         productId,
  //       }
  //     );

  //     set((state) => ({
  //       user: {...user, liked : response.data.patient.liked}
  //     }));
  //   } catch (error) {
  //     console.error(error.response?.data.message);
  //   }
  // },
}));

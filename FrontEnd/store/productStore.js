import { create } from "zustand";
import axios from "axios";
import { Alert } from "react-native";
import { useUserStore } from "./userStore";

export const useProductStore = create((set, get) => ({
  products: [],
  product: {},
  cart: [],
  loadingCart: true,
  fetchProducts: async () => {
    try {
      const result = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/product/`
      );
      set({ products: result.data, loading: false });
    } catch (error) {
      Alert.alert(error.message);
    }
  },
  getSingleProduct: async (productId) => {
    try {
      const result = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/product/${productId}`
      );
      set({ product: result.data });
    } catch (error) {
      console.log(error.response.data);
      Alert.alert(error.message);
    }
  },
  getCart: async () => {
    const token = useUserStore.getState().token;
    try {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/patient/cart/`
      );

      set({ cart: response.data, loadingCart: false });
    } catch (error) {
      console.error(error.message);
    }
  },
  likeProduct: async (productId) => {
    const token = useUserStore.getState().token;
    const user = useUserStore.getState().user;
    try {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/product/like/`,
        {
          productId,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // console.error(error.response?.data.message);
    }
  },
  unlikeProduct: async () => {},
  addToCart: async (productId) => {
    const token = useUserStore.getState().token;
    try {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/patient/cart/add`,
        {
          productId: productId,
        }
      );
      set((state) => ({
        cart: [...state.cart, response.data],
      }));
    } catch (error) {
      console.error(error.message);
    }
  },
}));

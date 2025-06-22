import { create } from "zustand";
import axios from "axios";
import { Alert } from "react-native";
import { useUserStore } from "./userStore";
import { useErrorStore } from "./errorStore";
import showToast from "../utils/showToast";
export const useProductStore = create((set, get) => ({
  products: [],
  product: {},
  cart: [],
  loadingCart: true,
  loadingProducts: true,
  clearProduct: () => set({ product: {} }),
  fetchProducts: async () => {
    try {
      const result = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/product/`
      );
      set({ products: result.data, loadingProducts: false });
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
      useErrorStore.getState().setError("Error loading product");
      // Alert.alert(error.message);
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
    const { user, setUser } = useUserStore.getState();
    try {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/product/like/`,
        {
          productId,
        }
      );
      setUser({
        ...user,
        liked: [...user.liked, productId],
      });
    } catch (error) {
      console.error(error);
      // console.error(error.response?.data.message);
    }
  },
  unlikeProduct: async (productId) => {
    const token = useUserStore.getState().token;
    const { user, setUser } = useUserStore.getState();
    try {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      const response = await axios.delete(
        `${process.env.EXPO_PUBLIC_API_URL}/product/like/${productId}`
      );
      setUser({
        ...user,
        liked: user.liked.filter((id) => id !== productId),
      });
    } catch (error) {
      console.error(error);
      // console.error(error.response?.data.message);
    }
  },
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

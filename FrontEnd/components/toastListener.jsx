// components/ToastListener.js
import { useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import { useErrorStore } from "../store/errorStore"; // repeat for other stores as needed

const ToastListener = () => {
  const toast = useToast();
  const { errorMessage, clearError, type } = useErrorStore();

  useEffect(() => {
    if (errorMessage) {
      toast.show(errorMessage, {
        type: type || "danger",
        animationType: "zoom-in",
        duration: 1000,
      });
      clearError(); // Clear error to avoid repeat toasts
    }
  }, [errorMessage]);

  return null;
};

export default ToastListener;

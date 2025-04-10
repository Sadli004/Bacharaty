import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export const useImagePicker = () => {
  const [imageUri, setImageUri] = useState(null);
  const [error, setError] = useState(null);

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") throw new Error("Permission denied");

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const clear = () => setImageUri(null);

  return { imageUri, pickImage, clear, error };
};

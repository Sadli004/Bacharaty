// // lib/stream.ts
import { StreamVideoClient } from "@stream-io/video-react-native-sdk";

import axios from "axios";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;

export const streamClient = new StreamVideoClient(apiKey);

export const getStreamToken = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/video-token/userId?userId=${userId}`
    );
    return response.data.token;
  } catch (error) {
    console.log(error);
  }
};

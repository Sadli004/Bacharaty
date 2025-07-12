// import { StreamVideoClient } from "@stream-io/video-react-native-sdk";

// let client = null;

// export const initializeStreamVideo = ({ apiKey, user, token }) => {
//   client = new StreamVideoClient({ apiKey, user, token });
//   return client;
// };

// export const getStreamVideoClient = () => client;

// export const getStreamToken = async (userId) => {
//   try {
//     const response = await axios.get(
//       `${process.env.EXPO_PUBLIC_API_URL}/video-token/userId?${userId}`
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

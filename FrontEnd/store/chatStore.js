import { create } from "zustand";
import { useUserStore } from "./userStore";
import axios from "axios";
export const useChatStore = create((set) => ({
  chats: [],
  messages: [],
  chat: null,
  getUserChats: async () => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    const response = await axios
      .get(`${process.env.EXPO_PUBLIC_API_URL}/chat/user`)
      .then((response) => {
        console.log(response.data);
        set({ chats: response.data.chats });
      })
      .catch((error) => {
        console.error(error.message);
      });
  },
  startNewChat: async (patient, doctor) => {
    console.log(doctor);
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/chat`,
        {
          patient,
          doctor,
        }
      );
      console.log(response.data);
      set((state) => ({
        chats: [...state.chats, response.data],
      }));
    } catch (error) {
      console.error(error.message);
    }
  },
  getChatMessages: async (chatId) => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/chat/${chatId}`
      );
      console.log(response.data);
      const messages = response.data.messages.map((msg) => {
        return {
          _id: msg._id,
          sender: msg.sender,
          content: msg.content,
          createdAt: msg.createdAt,
          media: msg.media
            ? `${process.env.EXPO_PUBLIC_API_URL}/download/chat/media/${msg.media}`
            : null,
          audio: msg.audio
            ? `${process.env.EXPO_PUBLIC_API_URL}/download/chat/audio/${msg.audio}`
            : null,
          file: msg.file
            ? `${process.env.EXPO_PUBLIC_API_URL}/download/chat/file/${msg.file}`
            : null,
        };
      });
      set({
        messages,
        receiver: response.data.receiver._id,
        chat: response.data,
      });
    } catch (error) {
      console.error(error.message);
    }
  },
  sendMessage: async (chatId, message) => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    console.log(useChatStore.getState().receiver);
    console.log(message);
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/chat/${chatId}`,
        {
          receiver: useChatStore.getState().receiver,
          content: message,
        }
      );
      console.log(response.data);
      set((state) => ({
        messages: [...state.messages, response.data],
      }));
    } catch (error) {
      console.error(error.message);
    }
  },
  editMessage: async (messageId, content) => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    console.log(process.env.EXPO_PUBLIC_API_URL);
    try {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id == messageId ? msg.content : content
        ),
      }));
      const response = await axios.patch(
        `${process.env.EXPO_PUBLIC_API_URL}/chat/message/edit/${messageId}`,
        {
          content: content,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  },
  deleteMessage: async (messageId) => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    console.log(messageId);
    try {
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id != messageId),
      }));
      const response = await axios.delete(
        `${process.env.EXPO_PUBLIC_API_URL}/chat/delete/message/${messageId}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  },
}));

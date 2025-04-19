import { create } from "zustand";
import { useUserStore } from "./userStore";
import axios from "axios";
import { getSocket } from "../utils/socket-io";
export const useChatStore = create((set) => ({
  chats: [],
  messages: [],
  chat: null,
  loadingMessages: true,
  loadingChats: true,

  getUserChats: async () => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/chat/user`
      );

      // Process chats to include proper profile pictures
      const processedChats = response.data.chats.map((chat) => {
        const receiverWithPic = {
          ...chat.receiver,
          profilePicture: chat.receiver.profilePicture
            ? `${process.env.EXPO_PUBLIC_API_URL}/download/user/profile/${chat.receiver.profilePicture}`
            : null,
        };

        return {
          ...chat,
          receiver: receiverWithPic,
          chatId: {
            ...chat.chatId,
            lastMessage: chat.chatId.lastMessage
              ? {
                  ...chat.chatId.lastMessage,
                  sender: {
                    ...chat.chatId.lastMessage.sender,
                    profilePicture: chat.chatId.lastMessage.sender
                      .profilePicture
                      ? `${process.env.EXPO_PUBLIC_API_URL}/download/user/profile/${chat.chatId.lastMessage.sender.profilePicture}`
                      : null,
                  },
                }
              : null,
          },
        };
      });

      set({ chats: processedChats, loadingChats: false });
    } catch (error) {
      console.error("Error fetching chats:", error.message);
    }
  },
  startNewChat: async (patient, doctor) => {
    // console.log(doctor);
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/chat`,
        {
          patient,
          doctor,
        }
      );
      return response.data.chat._id;
    } catch (error) {
      console.error(error.response.data.message);
    }
  },
  getChatMessages: async (chatId) => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/chat/${chatId}`
      );

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
      const receiver = response.data.receiver;
      receiver.profilePicture = `${process.env.EXPO_PUBLIC_API_URL}/download/user/profile/${receiver.profilePicture}`;

      set({
        messages,
        receiver,
        chat: response.data,
        loadingMessages: false,
      });
    } catch (error) {
      console.error(error.response.data);
    }
  },
  sendMessage: async (chatId, message) => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

    try {
      const receiverId = useChatStore.getState().receiver._id;

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/chat/${chatId}`,
        {
          receiver: receiverId,
          content: message,
        }
      );
      const sentMessage = response.data;

      // Emit socket message
      const socket = getSocket();
      socket.emit("send-message", {
        chatId,
        message: sentMessage,
        receiverId: receiverId,
      });
      set((state) => ({
        chats: state.chats.map((chat) =>
          chat.chatId._id === chatId
            ? {
                ...chat,
                chatId: {
                  ...chat.chatId,
                  lastMessage: sentMessage,
                },
                isSeen: true, // Mark as seen for sender
              }
            : chat
        ),
        messages: [...state.messages, response.data],
      }));
    } catch (error) {
      console.error(error.response.data);
      console.error(error.message);
    }
  },
  editMessage: async (messageId, content) => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    const socket = getSocket();
    const receiverId = useChatStore.getState().receiver._id;

    try {
      // Optimistic update
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === messageId ? { ...msg, content } : msg
        ),
      }));

      const response = await axios.patch(
        `${process.env.EXPO_PUBLIC_API_URL}/chat/message/edit/${messageId}`,
        { content }
      );

      // Notify other user via socket
      socket.emit("update-message", {
        message: response.data,
        receiverId,
      });

      return response.data;
    } catch (error) {
      console.error("Error editing message:", error.message);
      // Revert optimistic update on error
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === messageId ? { ...msg, content: msg.content } : msg
        ),
      }));
      throw error;
    }
  },
  deleteMessage: async (messageId) => {
    const token = useUserStore.getState().token;
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    const socket = getSocket();
    const receiverId = useChatStore.getState().receiver._id;
    try {
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id != messageId),
      }));
      const response = await axios.delete(
        `${process.env.EXPO_PUBLIC_API_URL}/chat/message/delete/${messageId}`
      );

      // Notify other user via socket
      socket.emit("delete-message", {
        messageId,
        receiverId,
      });
    } catch (error) {
      console.error(error.response.data);
    }
  },
}));

import { router } from "expo-router";
import ChatTab from "../../../components/chat";
import { useUserStore } from "../../../store/userStore";
export default function Chat() {
  const { user } = useUserStore();
  if (!user) router.replace("sign-in");
  return <ChatTab />;
}

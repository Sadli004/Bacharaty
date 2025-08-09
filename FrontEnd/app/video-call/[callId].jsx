// app/video-call.tsx
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import {
  StreamCall,
  CallContent,
  CallControls,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";

export default function VideoCallScreen() {
  const { callId } = useLocalSearchParams();
  const client = useStreamVideoClient();
  const [call, setCall] = useState(null);

  useEffect(() => {
    const setupCall = async () => {
      const call = client.call("default", callId);
      await call.join({ create: true });
      setCall(call);
    };

    setupCall();

    return () => {
      call?.leave();
      setCall(null);
    };
  }, [callId]);

  if (!call) return null;
  const goToChatScreen = async () => {
    router.back();
  };
  return (
    <StreamCall call={call}>
      <View style={{ flex: 1 }}>
        <CallContent onHangupCallHandler={goToChatScreen} />
      </View>
    </StreamCall>
  );
}

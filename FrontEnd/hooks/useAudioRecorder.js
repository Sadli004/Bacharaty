// hooks/useAudioRecorder.js
import { useState, useRef } from "react";
import { Audio } from "expo-av";

export const useAudioRecorder = () => {
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const recordingRef = useRef(null);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recordingRef.current = recording;
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      setAudioUri(uri);
      setRecording(null);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  return {
    recording,
    audioUri,
    isRecording: !!recording,
    startRecording,
    stopRecording,
    reset: () => setAudioUri(null),
  };
};

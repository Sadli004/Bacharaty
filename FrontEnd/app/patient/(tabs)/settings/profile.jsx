import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useUserStore } from "../../../../store/userStore";
import FormField from "../../../../components/formField";
import CustomButton from "../../../../components/customButton";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { DismissKeyboard } from "../../../../utils/keyboard";
import { useImagePicker } from "../../../../hooks/useImagePicker";
import { images } from "../../../../constants";
export default function Profile() {
  const { user, updateProfile } = useUserStore();
  const { imageUri, pickImage, clear } = useImagePicker();
  const [formData, setFormData] = useState({
    name: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
  const handleFormChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  return (
    <DismissKeyboard>
      <View className="flex-1 bg-[#f9f9f9]">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <SafeAreaView className="items-center mt-6 mb-4 space-y-3">
              <Image
                className="w-20 h-20 rounded-full"
                resizeMode="cover"
                source={
                  user?.profilePicture
                    ? {
                        uri: imageUri || user?.profilePicture,
                      }
                    : images.profile
                }
              />
              <Text className="font-pbold text-xl">{user?.name}</Text>
              <TouchableOpacity
                className="p-2.5 px-4 bg-primary rounded-3xl shadow-md"
                onPress={pickImage}
              >
                <Text className="text-white font-medium">Change picture</Text>
              </TouchableOpacity>
            </SafeAreaView>

            <View className="mx-4 py-6 px-4 mb-8 bg-lgray shadow-md rounded-xl">
              <FormField
                title="Name"
                defaultValue={user.name}
                value={user.name}
                otherStyles="bg-white"
                handleChange={(value) => handleFormChange("firstName", value)}
              />
              <FormField
                title="Last name"
                placeholder="Last name"
                defaultValue={user.lastName}
                otherStyles="bg-white"
                containerStyles="mt-2"
                handleChange={(value) => handleFormChange("lastName", value)}
              />
              <FormField
                title="Email"
                defaultValue={user.email}
                editable={false}
                containerStyles="mt-2"
                otherStyles="bg-white"
                handleChange={(value) => handleFormChange("email", value)}
              />
              <FormField
                title="Phone number"
                defaultValue={user.phoneNumber}
                containerStyles="mt-2"
                otherStyles="bg-white"
                handleChange={(value) => handleFormChange("phoneNumber", value)}
              />
            </View>

            <View className="items-center mb-8">
              <CustomButton
                title="Save"
                containerStyles="bg-primary rounded-3xl shadow-md w-[80%]"
                textStyles="text-white"
                handlePress={() => updateProfile(imageUri, formData)}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </DismissKeyboard>
  );
}

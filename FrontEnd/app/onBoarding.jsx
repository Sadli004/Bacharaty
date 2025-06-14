import Onboarding from "react-native-onboarding-swiper";
import { View, Text, Image } from "react-native";
import { images } from "../constants";
import { router } from "expo-router";
const OnboardingScreen = ({}) => {
  return (
    <Onboarding
      onSkip={() => router.replace("auth/sign-in")}
      onDone={() => router.replace("auth/sign-in")}
      pages={[
        {
          backgroundColor: "#AAEEEA",
          image: (
            <View className="justify-center items-center w-[70%] bg-white rounded-full">
              <Image
                source={images.checkup}
                resizeMode="cover"
                className=" w-[60%] h-[60%] "
              />
            </View>
          ),
          title: "Welcome",
          subtitle: "This is the best app for your needs.",
        },
        {
          backgroundColor: "#DEEBF8",
          image: (
            <View className="justify-center items-center h-66 w-66 bg-white rounded-full">
              <Image
                source={images.doctor}
                resizeMode="cover"
                className=" w-44 h-44 "
              />
            </View>
          ),
          title: "Discover",
          subtitle: "Find amazing products tailored for you.",
        },
        {
          backgroundColor: "#FFEFE5",
          image: (
            <View className="justify-center items-center h-66 w-66 bg-white rounded-full">
              <Image
                source={images.cosmetic}
                resizeMode="cover"
                className=" w-44 h-44 "
              />
            </View>
          ),
          title: "Get Started",
          subtitle: "Sign up and enjoy the experience!",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

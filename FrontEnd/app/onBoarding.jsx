import Onboarding from "react-native-onboarding-swiper";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import { images } from "../constants";
import { router } from "expo-router";
const OnboardingScreen = ({}) => {
  return (
    <Onboarding
      onSkip={() => router.replace("/sign-in")}
      onDone={() => router.replace("/sign-in")}
      pages={[
        {
          backgroundColor: "#AAEEEA",
          image: (
            <Image
              source={images.checkup}
              resizeMode="contain"
              className="h-[350px] w-[350px] bg-white rounded-full"
            />
          ),
          title: "Welcome",
          subtitle: "This is the best app for your needs.",
        },
        {
          backgroundColor: "#DEEBF8",
          image: (
            <Image
              source={images.doctor}
              resizeMode="cover"
              className=" h-[350px] w-[350px] bg-white rounded-full "
            />
          ),
          title: "Discover",
          subtitle: "Find amazing products tailored for you.",
        },
        {
          backgroundColor: "#FFEFE5",
          image: (
            <Image
              source={images.cosmetic}
              resizeMode="cover"
              className=" h-[350px] w-[350px] bg-white rounded-full "
            />
          ),
          title: "Get Started",
          subtitle: "Sign up and enjoy the experience!",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

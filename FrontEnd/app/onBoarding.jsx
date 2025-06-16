import Onboarding from "react-native-onboarding-swiper";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import { images } from "../constants";
import { router } from "expo-router";
const OnboardingScreen = ({}) => {
  return (
    <Onboarding
      onSkip={() => router.replace("/sign-in")}
      onDone={() => router.replace("/sign-in")}
      // imageContainerStyles={{
      //   backgroundColor: "white",
      //   borderRadius: "50%",
      //   margin: 50,
      // }}
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
    // <SafeAreaView className="bg-[#AAEEEA] h-full">
    //   <ScrollView>
    //     <View className="items-center justify-center min-h-[80vh] ">
    //       <Image
    //         source={images.checkup}
    //         resizeMode="contain"
    //         className="rounded-full bg-white w-[350px] h-[350px] mb-6"
    //       />
    //       <View className="items-center gap-4">
    //         <Text className="font-pbold text-xl">Chat with Our Doctors</Text>
    //         <Text>
    //           Lorem ipsum dolor sit amet consectetur, adipisicing elit.
    //           Accusamus sint repudiandae veniam! Quas vel illo numquam explicabo
    //         </Text>
    //       </View>
    //     </View>
    //     <View className="bg-[#AAEEEA] opacity-75 flex flex-row justify-around border p-2">
    //       <Text>Next</Text>
    //       <Text>Skip</Text>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export default OnboardingScreen;

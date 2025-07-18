import React from "react";
import { Tabs } from "expo-router";
import { Image, Text, View, Platform } from "react-native";
import { icons } from "../../../constants";
import { useColorScheme } from "nativewind";
const TabIcon = ({ color, focused, icon, name }) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme == "dark";
  return (
    <View className="justify-center items-center gap-1 min-w-[70px]">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${
          focused ? "font-psemibold" : "font-pregular"
        } text-xs text-${color} ${isDark && "text-white"} text-center`}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
};
const TabsLayout = () => {
  const isAndroid = Platform.OS == "android";
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme == "dark";
  return (
    <View className={`flex-1 `}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDark ? "#121212" : "#fafafa",
            paddingTop: 10,
            borderColor: "black",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.home}
                name="home"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="magasin"
          options={{
            title: "Magasin",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.magasin}
                name="Magasin"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="doctor"
          options={{
            title: "Doctor",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.doctor}
                name="Doctor"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.chat}
                name="Chat"
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={icons.settings}
                name="Settings"
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;

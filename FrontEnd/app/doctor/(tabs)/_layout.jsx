import React from "react";
import { Tabs } from "expo-router";
import { Image, Platform, Text, View } from "react-native";
import { icons } from "../../../constants";

const TabIcon = ({ color, focused, icon, name }) => {
  return (
    <View className="justify-center items-center gap-2 min-w-[70px]">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${
          focused ? "font-psemibold" : "font-pregular"
        } text-xs text-${color} text-center`}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
};
const TabsLayout = () => {
  const isAndroid = Platform.OS == "android";
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FAFAFA",
          paddingTop: 10,
          paddingBottom: isAndroid ? 10 : 0,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              icon={icons.home}
              name="Home"
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
        name="calendar"
        options={{
          title: "Calendar",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              icon={icons.calendar}
              name="Calendar"
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
  );
};

export default TabsLayout;

import React from "react";
import { Tabs } from "expo-router";
import { Image, Text, View, Platform } from "react-native";
import { icons } from "../../../constants";
const TabIcon = ({ color, focused, icon, name }) => {
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
          backgroundColor: isAndroid ? "#f9f9f9" : "#b4ebf5",
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
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
        name="cart"
        options={{
          title: "Cart",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              icon={icons.cart}
              name="Cart"
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
  );
};

export default TabsLayout;

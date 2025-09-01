import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: false,
      tabBarButton: HapticTab,
      tabBarBackground: TabBarBackground,
      tabBarStyle: Platform.select({
        ios: {
        position: 'absolute',
        backgroundColor: '#fff', // Set background bar to white
        },
        default: {
        backgroundColor: '#fff', // Set background bar to white
        },
      }),
      }}>
      <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="home" color={color} />,
      }}
      />
      <Tabs.Screen
      name="livestock"
      options={{
        title: 'Livestock',
        tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="cow" color={color} />,
      }}
      />
      <Tabs.Screen
      name="crop"
      options={{
        title: 'Crop',
        tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="fence" color={color} />,
      }}
      />
    </Tabs>
  );
}

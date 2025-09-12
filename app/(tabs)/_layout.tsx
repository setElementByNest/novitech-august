import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useEffect } from 'react';

import { Colors } from '@/constants/Colors';
import { IsLoginContext } from '@/contexts/IsLoginContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import LoginMain from '../login/LoginMain';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useContext(IsLoginContext);
  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ?
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
              title: 'Pen',
              tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="fence" color={color} />,
            }}
          />
        </Tabs>
        : <LoginMain />}
    </>

  );
}


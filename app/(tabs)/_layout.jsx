import { View, Text } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.BLUE1,
        tabBarInactiveTintColor: Colors.TAN,
        tabBarStyle: {
          backgroundColor: Colors.WHITE,
          borderTopColor: '#E0E0E0',
          paddingTop: -5,
          paddingBottom: 5,
          height: 50
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          paddingBottom: 4
        }
      }}
    >
      <Tabs.Screen 
        name="mytrip"
        options={{
          tabBarLabel: 'My Trip',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons 
              name="bag-carry-on" 
              size={28} 
              color={focused ? Colors.BLUE1 : Colors.TAN} 
            />
          )
        }}
      />
      
      <Tabs.Screen 
        name="discover"
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({color, focused}) => (
            <Ionicons 
              name="search" 
              size={24} 
              color={focused ? Colors.BLUE1 : Colors.TAN} 
            />
          )
        }}
      />
      
      <Tabs.Screen 
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, focused}) => (
            <FontAwesome 
              name="user" 
              size={24} 
              color={focused ? Colors.BLUE1 : Colors.TAN} 
            />
          )
        }}
      />
    </Tabs>
  );
}
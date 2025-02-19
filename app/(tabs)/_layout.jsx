import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:Colors.BLUE1
    }}>
        <Tabs.Screen name="mytrip"
        options={{
          tabBarLabel:'My Trip',
          tabBarIcon:({color})=><MaterialCommunityIcons name="bag-carry-on" size={28} color={Colors.BLUE1} />
        }}/>
        <Tabs.Screen name="discover"
        options={{
          tabBarLabel:'Discover',
          tabBarIcon:({color})=><Ionicons name="search" size={24} color={Colors.BLUE1} />
        }}/>
        <Tabs.Screen name="profile"
        options={{
          tabBarLabel:'Profile',
          tabBarIcon:({color})=><FontAwesome name="user" size={24} color={Colors.BLUE1} />
        }}/>
    </Tabs>
  )
}
import { View, Text, FlatList } from 'react-native';
import React from 'react';
import HotelCard from 'D:/major/ai-travel-app/components/TripDetails/HotelCard';
import { Colors } from '../../constants/Colors';

export default function HotelList({ HotelList: hotelData }) {
  return (
    <View style={{
      marginTop: 25,
      padding: 15,
      backgroundColor: Colors.WHITE,
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 22,
        color: Colors.BLUE1,
        marginBottom: 10,
      }}>
        Recommended Hotels
      </Text>
      
      <FlatList
        data={hotelData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <HotelCard item={item} />
        )}
      />
    </View>
  );
}

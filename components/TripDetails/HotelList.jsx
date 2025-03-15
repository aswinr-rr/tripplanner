import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect } from 'react';
import HotelCard from 'D:/major/ai-travel-app/components/TripDetails/HotelCard';

export default function HotelList({ HotelList: hotelData }) {
  


  
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>
        Hotels Recommended
      </Text>
        <FlatList
          data={hotelData}
          style={{
            marginTop:8
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({ item }) => (
            <HotelCard item={item}/> 
          )}
        />
    </View>
  );
}

import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect } from 'react';

export default function HotelList({ HotelList: hotelData }) {
  
  useEffect(()=>{
    GetGooglePhotoRef();
  },[])

  const GetGooglePhotoRef=async()=>{
    const result = await GetPhotoRef('Las Vegas,USA');
    console.log(result?.results[0]?.photos[0]?.photo_reference);
  }
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
            <View style={{
              marginRight:10,
              width:130,
              }}>
              <Image source={require('./../../assets/images/landing.jpg')}
                style={{
                    width: 110,
                    height: 110,
                    objectFit: 'cover',
                    borderRadius: 15,
                }}
            />
            <View>
              <Text style={{
                fontFamily:'outfit-medium',
                fontSize:15,
              }}>
                {item.name}
              </Text>
              <View>
                <Text style={{fontFamily:'outfit'}}>⭐{item.rating}</Text>
                <Text style={{fontFamily:'outfit'}}>🏷️{item.price}</Text>
              </View>
            </View>
            </View>
          )}
        />
    </View>
  );
}

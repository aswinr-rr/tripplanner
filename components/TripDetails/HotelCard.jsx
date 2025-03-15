import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetPhotoRef } from '../../configs/GooglePlaceApi';

export default function HotelCard({ item }) {
    const [photoRef, setPhotoRef] = useState();
    useEffect(() => {
        GetGooglePhotoRef();
    }, [])
    const GetGooglePhotoRef = async () => {
        const result = await GetPhotoRef(item.name);

        // Extract the first photo reference from the results
        const photoReference = result?.results[0]?.photos?.[0]?.photo_reference;

        if (photoReference) {
            setPhotoRef(photoReference);
        }
    };

    return (
        <View style={{
            marginRight: 10,
            width: 130,
        }}>
            <Image source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
            }}
                style={{
                    width: 130,
                    height: 110,
                    objectFit: 'cover',
                    borderRadius: 15,
                }}
            />

            <View>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 15,
                }}>
                    {item.name}
                </Text>
                <View>
                    <Text style={{ fontFamily: 'outfit' }}>⭐{item.rating}</Text>
                    <Text style={{ fontFamily: 'outfit' }}>🏷️{item.price}</Text>
                </View>
            </View>
        </View>
    )
}
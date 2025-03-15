import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { GetPhotoRef } from '../../configs/GooglePlaceApi';

export default function PlaceCard({ place, placeIndex }) {
    const [photoRef, setPhotoRef] = useState();
        useEffect(() => {
            GetGooglePhotoRef();
        }, [])
        const GetGooglePhotoRef = async () => {
            const result = await GetPhotoRef(place.name);
    
            // Extract the first photo reference from the results
            const photoReference = result?.results[0]?.photos?.[0]?.photo_reference;
    
            if (photoReference) {
                setPhotoRef(photoReference);
            }
        };
    return (
        <View
            style={{
                borderWidth: 1,
                padding: 10,
                borderRadius: 15,
                marginTop: 10,
                marginBottom: 10,
            }}>
            <Image source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
            }}
                style={{
                    width: '100%',
                    height: 150,
                    objectFit: 'cover',
                    borderRadius: 15,
                }}
            />
            <View style={{ margin: 10 }}>
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 17 }}>{place?.name}</Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 15 }}>{place?.details}</Text>
                <View>
                    <Text style={{ fontFamily: 'outfit-medium', fontSize: 15 }}>Ticket Price: {place?.ticketPricing}</Text>
                    <Text style={{ fontFamily: 'outfit-medium', fontSize: 15 }}>Time to travel: {place?.travelTime}</Text>
                </View>
                <View style={{ marginTop: 5, alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Entypo name="location" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

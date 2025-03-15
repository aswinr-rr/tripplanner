import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { GetPhotoRef } from '../../configs/GooglePlaceApi';
import { Colors } from '../../constants/Colors';

export default function HotelCard({ item, isLast }) {  // 'isLast' prop to remove margin from the last item
    const [photoRef, setPhotoRef] = useState();

    useEffect(() => {
        GetGooglePhotoRef();
    }, []);

    const GetGooglePhotoRef = async () => {
        const result = await GetPhotoRef(item.name);
        const photoReference = result?.results[0]?.photos?.[0]?.photo_reference;
        if (photoReference) {
            setPhotoRef(photoReference);
        }
    };

    const openGoogleMaps = () => {
        if (item.geoCoordinates) {
            const [lat, lng] = item.geoCoordinates.split(',');
            const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            Linking.openURL(url);
        }
    };

    return (
        <View style={{
            marginRight: isLast ? 0 : 20, // Adds spacing between hotels, but not after the last item
            alignItems: 'center',
        }}>
            {/* Hotel Image */}
            <Image
                source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
                }}
                style={{
                    width: 150,
                    height: 120,
                    borderRadius: 12,
                }}
            />

            {/* Hotel Details */}
            <View style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 16,
                    color: Colors.BLUE1,
                    textAlign: 'center',
                }}>
                    {item.name}
                </Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 15,
                    marginTop: 5,
                }}>
                    <Text style={{ fontFamily: 'outfit', fontSize: 14 }}>⭐ {item.rating}</Text>
                    <Text style={{ fontFamily: 'outfit', fontSize: 14 }}>🏷️ {item.price}</Text>
                </View>

                {/* View Location Button */}
                <TouchableOpacity
                    onPress={openGoogleMaps}
                    style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: Colors.BLUE1,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 8,
                    }}
                >
                    <Entypo name="location-pin" size={16} color={Colors.WHITE} />
                    <Text
                        style={{
                            fontFamily: 'outfit-bold',
                            fontSize: 12,
                            color: Colors.WHITE,
                            marginLeft: 4,
                        }}
                    >
                        View Location
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Vertical Separator (only if it's not the last item) */}
        </View>
    );
}

import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { GetPhotoRef } from '../../configs/GooglePlaceApi';
import { Colors } from '../../constants/Colors';
import { Linking } from 'react-native';

export default function PlaceCard({ place }) {
    const [photoRef, setPhotoRef] = useState();

    useEffect(() => {
        GetGooglePhotoRef();
    }, []);

    const GetGooglePhotoRef = async () => {
        const result = await GetPhotoRef(place.name);
        const photoReference = result?.results[0]?.photos?.[0]?.photo_reference;
        if (photoReference) {
            setPhotoRef(photoReference);
        }
    };

    return (
        <View
            style={{
                backgroundColor: Colors.WHITE,
                borderRadius: 20,
                padding: 15,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
            }}
        >
            {/* Place Image */}
            <Image
                source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
                }}
                style={{
                    width: '100%',
                    height: 180,
                    borderRadius: 15,
                }}
            />

            {/* Place Details */}
            <View style={{ marginTop: 10 }}>
                <Text
                    style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 20,
                        color: Colors.BLUE1,
                        textAlign: 'center',
                    }}
                >
                    {place?.name}
                </Text>

                <Text
                    style={{
                        fontFamily: 'outfit',
                        fontSize: 16,
                        color: Colors.DARK_GRAY,
                        marginVertical: 5,
                        textAlign: 'center',
                    }}
                >
                    {place?.details}
                </Text>

                {/* Best Time to Visit */}
                {place?.bestTimeToVisit && (
                    <View
                        style={{
                            backgroundColor: Colors.LIGHT_GREEN,
                            paddingVertical: 6,
                            paddingHorizontal: 12,
                            borderRadius: 10,
                            alignSelf: 'center',
                            marginTop: 5,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'outfit-medium',
                                fontSize: 16,
                                color: Colors.GREEN,
                                textAlign: 'center',
                            }}
                        >
                            📅 Best Time: {place?.bestTimeToVisit}
                        </Text>
                    </View>
                )}

                {/* Ticket Pricing & Travel Time */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                        paddingHorizontal: 10,
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text
                            style={{
                                fontFamily: 'outfit-medium',
                                fontSize: 16,
                                color: Colors.BLUE2,
                                textAlign: 'center',
                            }}
                        >
                            🎟️ {place?.ticketPricing}
                        </Text>
                    </View>

                    <View
                        style={{
                            width: 1,
                            height: 20,
                            backgroundColor: Colors.LIGHT_GRAY, // Thin separator line
                            marginHorizontal: 10,
                        }}
                    />

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text
                            style={{
                                fontFamily: 'outfit-medium',
                                fontSize: 16,
                                color: Colors.BLUE2,
                                textAlign: 'center',
                            }}
                        >
                            🕒 {place?.travelTime}
                        </Text>
                    </View>
                </View>

                {/* Location Button */}
                <TouchableOpacity
    onPress={() => {
        const [lat, lng] = place?.geoCoordinates?.split(','); // Assuming it's stored as "lat,lng"
        if (lat && lng) {
            const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            Linking.openURL(url);
        }
    }}
    style={{
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.BLUE1,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignSelf: 'center',
    }}
>
    <Entypo name="location-pin" size={20} color={Colors.WHITE} />
    <Text
        style={{
            fontFamily: 'outfit-bold',
            fontSize: 16,
            color: Colors.WHITE,
            marginLeft: 5,
        }}
    >
        View Location
    </Text>
</TouchableOpacity>
            </View>
        </View>
    );
}

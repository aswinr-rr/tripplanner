import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';

export default function PlannedTrip({ details }) {  // Corrected props structure
    return (
        <View>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20,
            }}>Plan Details</Text>

            {Object.entries(details).map(([day, dayDetails], index) => (
                <View key={index}>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 25,
                    }}>
                        Day {parseInt(day) + 1} {/* Converts "0" to "Day 1", "1" to "Day 2", etc. */}
                    </Text>

                    {dayDetails?.places?.map((place, placeIndex) => (
                        <View key={placeIndex}
                            style={{
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 15,
                                marginTop: 10,
                                marginBottom: 10,
                            }}>
                            <Image source={require('./../../assets/images/landing.jpg')}
                                style={{
                                    width: '100%',
                                    height: 130,
                                    objectFit: 'cover',
                                    borderRadius: 15,
                                }}
                            />
                            <View style={{
                                margin: 10,
                            }}>
                                <Text style={{
                                    fontFamily: 'outfit-medium',
                                    fontSize: 17,
                                }}>{place?.name}</Text>
                                <Text style={{
                                    fontFamily: 'outfit',
                                    fontSize: 15,
                                }}>{place?.details}</Text>
                                <View>
                                    <Text style={{
                                        fontFamily: 'outfit-medium',
                                        fontSize: 15,
                                    }}>Ticket Price: {place?.ticketPricing}</Text>
                                    <Text style={{
                                        fontFamily: 'outfit-medium',
                                        fontSize: 15,
                                    }}>Time to travel: {place?.travelTime}</Text>
                                </View>
                                <View style={{
                                    marginTop: 5,
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity>
                                        <Entypo name="location" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
}

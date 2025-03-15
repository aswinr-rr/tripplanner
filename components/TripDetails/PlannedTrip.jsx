import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import PlaceCard from './PlaceCard';

export default function PlannedTrip({ details }) {
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
                        <PlaceCard key={placeIndex} place={place} placeIndex={placeIndex} />
                    ))}
                </View>
            ))}
        </View>
    );
}

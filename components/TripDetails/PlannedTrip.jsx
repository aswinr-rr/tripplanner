import { View, Text } from 'react-native';
import React from 'react';
import PlaceCard from './PlaceCard';
import { Colors } from '../../constants/Colors';

export default function PlannedTrip({ details }) {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 22,
                color: Colors.BLUE1,
                marginBottom: 10,
            }}>
                Plan Details
            </Text>

            {Object.entries(details).map(([day, dayDetails], index) => (
                <View key={index} style={{ marginBottom: 15 }}>
                {/* Day Heading */}
                <Text
                    style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 20,
                        color: Colors.DARK_GRAY,
                        marginBottom: 15,
                    }}
                >
                    🗓️ Day {parseInt(day) + 1}
                </Text>
            
                {/* Places for the Day */}
                {dayDetails?.places?.map((place, placeIndex) => (
                    <PlaceCard key={placeIndex} place={place} placeIndex={placeIndex} />
                ))}
            
                {/* Separator Line */}
                <View
                    style={{
                        marginTop: 10,
                        borderBottomWidth: 1.5,
                        borderBottomColor: Colors.BLUE2,
                        borderStyle: 'dashed',
                        opacity: 0.6, // Slightly faded effect
                    }}
                />
            </View>
            
            ))}
        </View>
    );
}

import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function UserTripCard({ trip }) {
    const formatData = (data) => JSON.parse(data);
    const router = useRouter();

    return (
        <View style={{
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.TAN,
            borderRadius: 15,
            padding: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3, 
        }}>
            {/* Image Section */}
            <Image source={{
                uri:
                    'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                    + formatData(trip.tripData).locationInfo?.photoRef
                    + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
            }}
                style={{
                    width: 90,
                    height: 90,
                    borderRadius: 15,
                }}
            />
            
            {/* Details Section */}
            <View style={{
                flex: 1,
                marginLeft: 15,
            }}>
                <Text style={{
                    fontSize: 18,
                    fontFamily: 'outfit-medium',
                    color: Colors.BLACK,
                }}>
                    {trip.tripPlan?.TravelSummary?.destination}
                </Text>
                <Text style={{
                    fontSize: 15,
                    color: Colors.DARK_GRAY,
                    marginTop: 2,
                }}>
                    {moment(formatData(trip.tripData).startDate).format('DD MMM YYYY')}
                </Text>
                <Text style={{
                    fontSize: 15,
                    color: Colors.DARK_GRAY,
                }}>
                    {formatData(trip.tripData).traveller.title}
                </Text>
            </View>

            {/* View Button */}
            <TouchableOpacity
                onPress={() => router.push({
                    pathname: '/trip-details',
                    params: { trip: JSON.stringify(trip) }
                })}
                style={{
                    backgroundColor: Colors.BLUE1,
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 2, 
                }}>
                <Text style={{
                    color: Colors.WHITE,
                    fontFamily: 'outfit-medium',
                    fontSize: 16,
                    textAlign: 'center'
                }}>
                    View
                </Text>
            </TouchableOpacity>
        </View>
    )
}

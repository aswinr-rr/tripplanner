import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

export default function UserTripList({ userTrips, setUserTrips }) {
    const router = useRouter();

    if (!userTrips || userTrips.length === 0) {
        return (
            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: Colors.DARK_GRAY }}>No trips available</Text>
            </View>
        );
    }

    const LatestTrip = JSON.parse(userTrips[0]?.tripData || '{}');

    return (
        <View style={{ marginTop: 20 }}>
            {/* Trip Image */}
            <View style={{
                borderRadius: 15,
                overflow: 'hidden',
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 3,
            }}>
                {LatestTrip.locationInfo?.photoRef ? (
                    <Image
                        source={{
                            uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                                + LatestTrip.locationInfo.photoRef
                                + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
                        }}
                        style={{ width: '100%', height: 150 }}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={{
                        width: '100%',
                        height: 150,
                        backgroundColor: Colors.LIGHT_GRAY,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: Colors.DARK_GRAY }}>No Image Available</Text>
                    </View>
                )}
            </View>

            {/* Trip Details */}
            <View style={{
                backgroundColor: Colors.WHITE,
                padding: 10,
                borderRadius: 15,
                marginTop: -20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
            }}>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 22,
                    color: Colors.BLACK,
                }}>
                    {userTrips[0]?.tripPlan?.TravelSummary?.destination || 'Unknown Destination'}
                </Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 8,
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 16,
                        color: Colors.DARK_GRAY,
                    }}>
                        {LatestTrip.startDate ? moment(LatestTrip.startDate).format('DD MMM YYYY') : 'Unknown Date'}
                    </Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 16,
                        color: Colors.DARK_GRAY,
                    }}>
                        {LatestTrip.traveller?.title || 'Unknown Traveller'}
                    </Text>
                </View>

                {/* "See Your Plan" Button */}
                <TouchableOpacity
                    onPress={() => router.push({
                        pathname: '/trip-details',
                        params: { trip: JSON.stringify(userTrips[0]) }
                    })}
                    style={{
                        paddingVertical: 12,
                        backgroundColor: Colors.BLUE1,
                        borderRadius: 12,
                        marginTop: 20,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.15,
                        shadowRadius: 3,
                        elevation: 3,
                    }}>
                    <Text style={{
                        color: Colors.WHITE,
                        fontFamily: 'outfit-medium',
                        fontSize: 16,
                        textAlign: 'center',
                    }}>
                        See Your Plan
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Other User Trips */}
            <View style={{ marginTop: 20 }}>
                {userTrips.map((trip, index) => (
                    <UserTripCard trip={trip} setUserTrips={setUserTrips} key={trip.docId || index} />
                ))}
            </View>
        </View>
    );
}

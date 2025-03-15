import { View, Text, Image, StatusBar, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';

export default function TripDetails() {
    const navigation = useNavigation();
    const { trip } = useLocalSearchParams();
    const [tripDetails, setTripDetails] = useState(null);

    const formatData = (data) => {
        try {
            return typeof data === 'string' ? JSON.parse(data) : data;
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return {};
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });

        try {
            const parsedTrip = typeof trip === 'string' ? JSON.parse(trip) : trip;
            setTripDetails(parsedTrip);
        } catch (error) {
            console.error("Error parsing trip data:", error);
            setTripDetails({});
        }
    }, []);

    return tripDetails && (
        <ScrollView style={{ flex: 1 }}>
            {/* Hide Status Bar */}
            <StatusBar hidden={true} />
            <Image source={{
                uri:
                    'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                    + (formatData(tripDetails?.tripData)?.locationInfo?.photoRef || '')
                    + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
            }}
                style={{
                    width: '100%',
                    height: 300,
                    borderRadius: 15,
                }}
            />
            <View style={{
                padding: 20,
                backgroundColor: Colors.WHITE,
                height: '100%',
                marginTop: -30,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 5,
            }}>
                <Text style={{
                    fontSize: 26,
                    fontFamily: 'outfit-bold',
                    color: Colors.BLUE1,
                    textAlign: 'center',
                    marginBottom: 5,
                }}>
                    {tripDetails?.tripPlan?.TravelSummary?.destination}
                </Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 5,
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'outfit-medium',
                        color: Colors.DARK_GRAY,
                    }}>
                        {moment(formatData(tripDetails.tripData).startDate).format('DD MMM YYYY')}
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'outfit-medium',
                        color: Colors.DARK_GRAY,
                        marginHorizontal: 8,
                    }}>
                        -
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'outfit-medium',
                        color: Colors.DARK_GRAY,
                    }}>
                        {moment(formatData(tripDetails.tripData).endDate).format('DD MMM YYYY')}
                    </Text>
                </View>

                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 18,
                    color: Colors.DARK_GRAY,
                    textAlign: 'center',
                    marginTop: 5,
                }}>
                    {formatData(tripDetails.tripData)?.traveller.title}
                </Text>
                <FlightInfo flightData={tripDetails?.tripPlan?.FlightDetails} />

                {/* Hotels list */}
                <HotelList HotelList={tripDetails?.tripPlan?.Hotels} />
                {/* Trip day planner */}
                <PlannedTrip details={tripDetails?.tripPlan?.Itinerary} />
            </View>



        </ScrollView>
    );
}


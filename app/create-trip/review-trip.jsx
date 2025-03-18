import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from './../../context/CreateTripContext';
import moment from 'moment';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ReviewTrip() {
  
    const navigation = useNavigation();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        })
    }, []);

    return (
        <View style={{
            flex: 1,
            padding: 25,
            paddingTop: 60,
            backgroundColor: Colors.WHITE,
        }}> 
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 32,
                marginBottom: 16,
            }}>Review Trip</Text>

            <View style={{
                marginBottom: 30,
            }}>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 18,
                    lineHeight: 24,
                    opacity: 0.8,
                }}>Before generating your trip, please review your selection!</Text>
            
                {/* Destination review */}
                <View style={{
                    marginTop: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8,
                }}>
                    <View style={{
                        width: 50,
                        alignItems: 'center',
                    }}>
                        <Ionicons name="location-sharp" size={32} color="black" />
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 16,
                            opacity: 0.7,
                        }}>Destination</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 20,
                        }}>{tripData?.locationInfo?.name}</Text>
                    </View>
                </View>

                {/* Dates */}
                <View style={{
                    marginTop: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8,
                }}>
                    <View style={{
                        width: 50,
                        alignItems: 'center',
                    }}>
                        <Ionicons name="calendar" size={28} color="black" />
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 16,
                            opacity: 0.7,
                        }}>Travel dates</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 18,
                        }}>
                            {moment(tripData?.startDate).format('DD MMM') + " to " + moment(tripData.endDate).format('DD MMM')}
                            {' '}({tripData?.totalNoOfDays} days)
                        </Text>
                    </View>
                </View>

                {/* Travellers */}
                <View style={{
                    marginTop: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8,
                }}>
                    <View style={{
                        width: 50,
                        alignItems: 'center',
                    }}>
                        <MaterialCommunityIcons name="bag-checked" size={28} color="black" />
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 16,
                            opacity: 0.7,
                        }}>Who's Travelling</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 18,
                        }}>{tripData?.traveller?.title}
                        </Text>
                    </View>
                </View>

                {/* Budget */}
                <View style={{
                    marginTop: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8,
                }}>
                    <View style={{
                        width: 50,
                        alignItems: 'center',
                    }}>
                        <MaterialIcons name="attach-money" size={28} color="black" />
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 16,
                            opacity: 0.7,
                        }}>Budget</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 18,
                        }}>{tripData?.budget}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => router.replace('/create-trip/generate-trip')}
                activeOpacity={0.8}
                style={{
                    padding: 16,
                    backgroundColor: Colors.BLUE1,
                    borderRadius: 16,
                    marginTop: 'auto',
                    marginBottom: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                }}>
                <Text style={{
                    textAlign: 'center',
                    color: Colors.WHITE,
                    fontFamily: 'outfit-medium',
                    fontSize: 16,
                    letterSpacing: 0.5,
                }}>
                    Build My Trip
                </Text>
            </TouchableOpacity>
        </View>
    )
}
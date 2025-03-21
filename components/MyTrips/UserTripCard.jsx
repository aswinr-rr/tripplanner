import { View, Text, Image, TouchableOpacity, Modal, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { AntDesign } from '@expo/vector-icons';

export default function UserTripCard({ trip, setUserTrips }) {
    const formatData = (data) => JSON.parse(data);
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current; // For modal animation

    const showModal = () => {
        setModalVisible(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleDelete = async (docId) => {
        try {
            await deleteDoc(doc(db, 'UserTrips', docId));

            // Update UI: Remove deleted trip from state
            setUserTrips(prevTrips => prevTrips.filter(item => item.docId !== docId));

            showModal(); // Show success modal
        } catch (error) {
            console.error("Error deleting trip:", error);
        }
    };

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

            <View>
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

                {/* Delete Button */}
                <TouchableOpacity
                    onPress={() => trip.docId && handleDelete(trip.docId)}
                    style={{
                        backgroundColor: Colors.WHITE,
                        paddingVertical: 2,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 2,
                        marginTop: 10,
                    }}>
                    <Text style={{
                        color: Colors.PRIMARY,
                        fontFamily: 'outfit-medium',
                        fontSize: 16,
                        textAlign: 'center'
                    }}>
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Custom Deletion Confirmation Modal */}
            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Animated.View style={{
                        width: 300,
                        backgroundColor: Colors.WHITE,
                        padding: 20,
                        borderRadius: 15,
                        alignItems: 'center',
                        opacity: fadeAnim,
                        transform: [{ scale: fadeAnim }]
                    }}>
                        <AntDesign name="checkcircle" size={50} color={Colors.GREEN} />
                        <Text style={{
                            fontSize: 20,
                            fontFamily: 'outfit-medium',
                            color: Colors.BLACK,
                            marginTop: 10,
                        }}>
                            Trip Deleted!
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            color: Colors.DARK_GRAY,
                            marginTop: 5,
                            textAlign: 'center',
                        }}>
                            Your trip itinerary has been removed successfully.
                        </Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{
                                marginTop: 15,
                                backgroundColor: Colors.BLUE1,
                                paddingVertical: 8,
                                paddingHorizontal: 30,
                                borderRadius: 10,
                            }}>
                            <Text style={{
                                color: Colors.WHITE,
                                fontFamily: 'outfit-medium',
                                fontSize: 16,
                                textAlign: 'center',
                            }}>
                                OK
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    )
}

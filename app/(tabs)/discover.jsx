import { View, Text, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Discover() {
  const [discoverTrips, setDiscoverTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchDiscoverTrips();
  }, []);

  const fetchDiscoverTrips = async () => {
    setLoading(true);
    setDiscoverTrips([]); // Reset before fetching
    try {
      const q = query(collection(db, 'UserTrips'), where('userEmail', '==', 'discover@gmail.com'));
      const querySnapshot = await getDocs(q);

      let trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });

      setDiscoverTrips(trips);
    } catch (error) {
      console.error("Error fetching discover trips:", error);
    }
    setLoading(false);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Discover New Trips 🌍</Text>

      {loading && <ActivityIndicator size={'large'} color="#007bff" />}

      {discoverTrips.length === 0 ? (
        <Text style={styles.noTrips}>No trips available. Check back later!</Text>
      ) : (
        discoverTrips.map((trip, index) => {
          const tripData = trip?.tripData ? JSON.parse(trip.tripData) : null;
          return (
            <View key={index} style={styles.tripCard}>
              {/* Trip Image */}
              {tripData?.locationInfo?.photoRef && (
                <Image
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
                  }}
                  style={styles.tripImage}
                  resizeMode="cover"
                />
              )}

              {/* Trip Details */}
              <View style={styles.tripDetails}>
                <Text style={styles.tripTitle}>{trip?.tripPlan?.TravelSummary?.destination || "Unknown Destination"}</Text>
                <Text style={styles.tripDate}>📅 4</Text>
                <Text style={styles.tripTraveler}>👤 {tripData?.traveller?.title || "Traveler"}</Text>

                {/* "Explore" Button */}
                <TouchableOpacity
                  onPress={() => router.push({
                    pathname: '/trip-details',
                    params: { trip: JSON.stringify(trip) }
                  })}
                  style={styles.exploreButton}
                >
                  <Text style={styles.exploreButtonText}>Explore</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  noTrips: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 20,
  },
  tripCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tripImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  tripDetails: {
    paddingHorizontal: 5,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  tripTraveler: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  exploreButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  exploreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

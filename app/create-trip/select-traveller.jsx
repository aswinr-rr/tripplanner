import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import {SelectTravellerList} from './../../constants/Options'
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function selecttraveller() {
    const navigation=useNavigation();
    const [selectedTraveller,setSelectedTraveller]=useState();
    const {tripData,setTripData}=useContext(CreateTripContext);

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:'',
        })
    },[])

    useEffect(()=>{
      setTripData({...tripData,
        traveller:selectedTraveller
      })

    },[selectedTraveller])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Who's Travelling</Text>
        <Text style={styles.headerSubtitle}>Choose your travellers</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <FlatList
          data={SelectTravellerList}
          showsVerticalScrollIndicator={false}
          renderItem={({item,index})=>(
            <TouchableOpacity 
              onPress={()=>setSelectedTraveller(item)}
              style={styles.optionCardWrapper}
            >
              <OptionCard option={item} selectedOption={selectedTraveller}/>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.flatListContent}
        />
      </View>

      <TouchableOpacity
        onPress={()=>router.push('/create-trip/select-dates')}
        style={styles.continueButton}
        activeOpacity={0.8}
      >
        <Text style={styles.continueButtonText}>
          Continue
        </Text>
        <Ionicons name="arrow-forward" size={20} color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 75,
    backgroundColor: Colors.WHITE,
    height: '100%',
    position: 'relative',
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 35,
    fontFamily: 'outfit-bold',
    marginTop: 20,
    color: Colors.BLUE1,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 20,
    fontFamily: 'outfit',
    color: Colors.BLUE2,
    marginTop: 10,
    marginBottom: 5,
  },
  contentContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  optionCardWrapper: {
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  continueButton: {
    padding: 16,
    backgroundColor: Colors.BLUE1,
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.BLUE1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  continueButtonText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: 'outfit-medium',
    fontSize: 16,
    marginRight: 8,
  }
});
import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SelectDates() {

    const navigation=useNavigation();
    const [startDate,setStartDate]=useState();
    const [endDate,setEndDate]=useState();
    const {tripData,setTripData}=useContext(CreateTripContext);
    const router=useRouter();


    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:'',
        })
    })

    const onDateChange=(date,type)=>{
        console.log(date,type);
        if(type=='START_DATE')
        {
            setStartDate(moment(date))
        }
        else{
            setEndDate(moment(date))
        }
    }

    const OnDateSelectonContinue=()=>{

        if(!startDate&&!endDate){
            ToastAndroid.show('Please select Start and End Dates',ToastAndroid.LONG)
            return;
        }
        const totalNoOfDays=endDate.diff(startDate,'days');
        console.log(totalNoOfDays+1);
        setTripData({
            ...tripData,
            startDate:startDate,
            endDate:endDate,
            totalNoOfDays:totalNoOfDays+1,

        });

        router.push('/create-trip/select-budget')
    }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Travel Dates</Text>
        <Text style={styles.headerSubtitle}>Select your trip duration</Text>
      </View>
      
      <View style={styles.calendarContainer}>
        <CalendarPicker 
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date} 
          maxRangeDuration={5}
          selectedRangeStyle={{
            backgroundColor: Colors.BLUE3
          }}
          selectedDayColor={Colors.BLUE1}
          selectedDayTextColor={Colors.WHITE}
          todayBackgroundColor="transparent"
          todayTextStyle={{color: Colors.BLUE1, fontWeight: 'bold'}}
          monthTitleStyle={styles.monthTitleStyle}
          yearTitleStyle={styles.yearTitleStyle}
          dayLabelsWrapper={styles.dayLabelsWrapper}
          textStyle={styles.calendarTextStyle}
          previousComponent={<Ionicons name="chevron-back" size={24} color={Colors.BLUE1} />}
          nextComponent={<Ionicons name="chevron-forward" size={24} color={Colors.BLUE1} />}
        />
      </View>
      
      <View style={styles.dateDisplayContainer}>
        {startDate && (
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Start Date</Text>
            <Text style={styles.dateValue}>{startDate.format('MMM DD, YYYY')}</Text>
          </View>
        )}
        
        {endDate && (
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>End Date</Text>
            <Text style={styles.dateValue}>{endDate.format('MMM DD, YYYY')}</Text>
          </View>
        )}
        
        {startDate && endDate && (
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Duration</Text>
            <Text style={styles.dateValue}>{endDate.diff(startDate, 'days') + 1} days</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={OnDateSelectonContinue}
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
    paddingTop: 50,
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    marginTop: 20,
    color: Colors.BLUE1,
  },
  headerSubtitle: {
    fontFamily: 'outfit',
    fontSize: 18,
    color: Colors.BLUE2,
    marginTop: 5,
  },
  calendarContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  monthTitleStyle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: Colors.BLUE1,
  },
  yearTitleStyle: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: Colors.BLUE2,
  },
  dayLabelsWrapper: {
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  calendarTextStyle: {
    fontFamily: 'outfit',
    color: '#333',
  },
  dateDisplayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  dateBox: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  dateLabel: {
    fontFamily: 'outfit',
    fontSize: 12,
    color: Colors.BLUE2,
    marginBottom: 5,
  },
  dateValue: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: Colors.BLUE1,
  },
  continueButton: {
    padding: 16,
    backgroundColor: Colors.BLUE1,
    borderRadius: 15,
    marginTop: 20,
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
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';

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
    <View
    style={{
        padding:25,
        paddingTop:50,
        backgroundColor:Colors.WHITE,
        height:'100%'
        
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        marginTop:20,
      }}>Travel Dates</Text>
      <View>
      <CalendarPicker onDateChange={onDateChange}
      allowRangeSelection={true}
      minDate={new Date} 
      maxRangeDuration={5}
      selectedRangeStyle={{
        backgroundColor:Colors.BLUE3
      }}
      />
      </View>
            <TouchableOpacity
            onPress={OnDateSelectonContinue}
            style={{
              padding:15,
              backgroundColor:Colors.BLUE1,
              borderRadius:15,
              marginTop:27,
            }}>
              <Text style={{
                textAlign:'center',
                color:Colors.WHITE,
                fontFamily:'outfit-medium',
                fontSize:15,
              }}>
                Continue
              </Text>
            </TouchableOpacity>
    </View>
  )
}
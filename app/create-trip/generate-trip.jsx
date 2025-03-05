import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { Image } from "expo-image";
import { useContext } from 'react';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/AiModel';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../configs/FirebaseConfig';

export default function GenerateTrip() {

    const {tripData,setTripData}=useContext(CreateTripContext);
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    const user=auth.currentUser;
    useEffect(()=>{
        GenerateAiTrip()
    },[])

    const GenerateAiTrip=async()=>{
        setLoading(true);
        const FINAL_PROMPT=AI_PROMPT
        .replace('{location}',tripData?.locationInfo?.name)
        .replace('{totalDays}',tripData?.totalNoOfDays)
        .replace('{totalNights}',tripData?.totalNoOfDays-1)
        .replace('{traveller}',tripData?.traveller?.title)
        .replace('{budget}',tripData?.budget)
        .replace('{totalDays}',tripData?.totalNoOfDays)
        .replace('{totalNights}',tripData?.totalNoOfDays-1)

        console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    const tripResp=JSON.parse(result.response.text());
    setLoading(false)

    const docId=(Date.now()).toString();
    const result_ = await setDoc(doc(db,"UserTrips",docId),{
      userEmail:user.email,
      tripPlan:tripResp, //AI result
      tripData:JSON.stringify(tripData), //User slection
      docId:docId,
    })

        router.push('(tabs)/mytrip');

    }
  return (
    <View style={{
        padding:25,
        marginTop:50,
        backgroundColor:Colors.WHITE,
        height:'100%',

    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25,
        textAlign:'center',
        marginTop:30,
      }}>Please Wait....</Text>
    
    <Text style={{
        fontFamily:'outfit',
        fontSize:25,
        textAlign:'center',
      }}>We are working on your plan.</Text>
      <View style={{marginTop:30}}>
    <Image source={require("../../assets/images/Hourglass.gif")} style={{ width: 100, height: 100,alignSelf: "center" }} />
    </View>
    <Text style={{
        fontFamily:'outfit',
        fontSize:25,
        textAlign:'center',
        marginTop:30,
      }}>Do not go back.</Text>
    </View>
  )
}
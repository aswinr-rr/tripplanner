import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from './../../components/CreateTrip/OptionCard'
import { CreateTripContext } from '../../context/CreateTripContext';


export default function SelectBudget() {
  
    const navigation=useNavigation();
    const [selectedOption,setSelectedOption]=useState();
    const {tripData,setTripData}=useContext(CreateTripContext);
    
        const router=useRouter();

        useEffect(()=>{
            navigation.setOptions({
                headerShown:true,
                headerTransparent:true,
                headerTitle:'',
            })
        },[]);

        useEffect(()=>{
            setTripData({
                ...tripData,
                budget:selectedOption?.title
            })
        },[selectedOption])

        const onClickContinue=()=>{
            if(!selectedOption)
            {
                ToastAndroid.show('Select Your Budget',ToastAndroid.LONG);
                return ;
            }
            router.push('/create-trip/review-trip');
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
      }}>Select Budget</Text>
      <View>
        <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
        }}>Choose your spending habits</Text>

        <FlatList
        data={SelectBudgetOptions}
        renderItem={({item,index})=>(
            <TouchableOpacity style={{
                marginVertical:10
            }}
            onPress={()=>setSelectedOption(item)}
            >
                <OptionCard option={item} selectedOption={selectedOption}/>
            </TouchableOpacity>
        )}
        
        />
      </View>
            <TouchableOpacity
            onPress={()=>onClickContinue()}
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
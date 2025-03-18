import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from './../../components/CreateTrip/OptionCard'
import { CreateTripContext } from '../../context/CreateTripContext';


export default function SelectBudget() {
  
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        })
    }, []);

    useEffect(() => {
        setTripData({
            ...tripData,
            budget: selectedOption?.title
        })
    }, [selectedOption])

    const onClickContinue = () => {
        if(!selectedOption) {
            ToastAndroid.show('Select Your Budget', ToastAndroid.LONG);
            return;
        }
        router.push('/create-trip/review-trip');
    }

    return (
        <View 
            style={{
                flex: 1,
                padding: 25,
                paddingTop: 60,
                backgroundColor: Colors.WHITE,
            }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 32,
                marginBottom: 16,
            }}>Select Budget</Text>
            
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20,
                marginBottom: 12,
            }}>Choose your spending habits</Text>

            <FlatList
                data={SelectBudgetOptions}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                        style={{
                            marginVertical: 8
                        }}
                        activeOpacity={0.7}
                        onPress={() => setSelectedOption(item)}
                    >
                        <OptionCard option={item} selectedOption={selectedOption}/>
                    </TouchableOpacity>
                )}
            />
            
            <TouchableOpacity
                onPress={() => onClickContinue()}
                activeOpacity={0.8}
                style={{
                    padding: 16,
                    backgroundColor: Colors.BLUE1,
                    borderRadius: 16,
                    marginTop: 20,
                    shadowColor: Colors.BLUE1,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 5,
                }}>
                <Text style={{
                    textAlign: 'center',
                    color: Colors.WHITE,
                    fontFamily: 'outfit-medium',
                    fontSize: 16,
                    letterSpacing: 0.5,
                }}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    )
}
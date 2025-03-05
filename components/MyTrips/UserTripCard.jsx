import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment';

export default function UserTripCard({ trip }) {
    const formatData=(data)=>{
        return JSON.parse(data);
    }

    return (
        <View style={{
            marginTop:15,
            display:'flex',
            flexDirection:'row',
            gap:10,
            alignItems:'center'
            }}>
            {/* <Image source={require('./../../assets/images/landing.jpg')}
                style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: 15,
                }}
            /> */}
            <Image source={{uri:
                            'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400 &photo_reference='
                            +formatData(trip.tripData).locationInfo?.photoRef
                            +'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
                            style={{
                                width: 100,
                                height: 100,
                                objectFit: 'cover',
                                borderRadius: 15,
                            }}
                            
                            />
            <View>
                <Text>{trip.tripPlan?.TravelSummary?.destination}</Text>
                <Text>{moment(formatData(trip.tripData).startDate).format('DD MMM YYYY')}</Text>
                <Text>{formatData(trip.tripData).traveller.title}</Text>
            </View>
        </View>
    )
}
import { Image, StyleSheet, Text, View } from "react-native";
import Login from './../components/Login'
import { Colors } from "@/constants/Colors";

export default function Index() {
  return (
    <View>
      <Image source={require('./../assets/images/landing.jpg')}
      style={{
        width:'100%',
        height:400
      }} />
      <View style={styles.container}>
        <Text style={{
          fontSize:25,
          fontFamily:'outfit-bold',
          textAlign:"center",
          color:Colors.BLUE1, 
        }}>AI Travel Planner</Text>
        <Text style={{
          fontFamily:'outfit',
          fontSize:18,
          textAlign:"center",
          color:Colors.BLUE2
        }}>
        Plan your perfect trip effortlessly with AI-powered itineraries tailored to your preferences, budget, and real-time updates!
        </Text>
        <View style={styles.button}>
          <Text style={{color:Colors.WHITE,
            textAlign:"center",
            fontFamily:'outfit',
            fontSize:16
          }}>
            Sign In With Google
          </Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.WHITE,
    marginTop:-10,
    height:'100%',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    padding:25
  },
  button:{
    padding:17,
    width:230,
    marginLeft:38,
    backgroundColor:Colors.BLUE1,
    borderRadius:99,
    marginTop:'17%',
  }
})

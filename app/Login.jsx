import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  
  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('./../assets/images/landing.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlayView} />
      <View style={styles.container}>
        <Text style={styles.title}>
          AI Travel Planner
        </Text>
        <Text style={styles.subtitle}>
          Plan your perfect trip effortlessly with AI-powered itineraries tailored to your preferences, budget, and real-time updates!
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('auth/sign-in')}
        >
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  overlayView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 400,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -25,
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    textAlign: "center",
    color: Colors.BLUE1,
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: 'outfit',
    fontSize: 18,
    textAlign: "center",
    color: Colors.BLUE2,
    lineHeight: 26,
    paddingHorizontal: 10,
  },
  button: {
    width: 230,
    backgroundColor: Colors.BLUE1,
    padding: 17,
    borderRadius: 99,
    marginTop: '17%',
    alignSelf: 'center',
    shadowColor: Colors.BLUE1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: 'outfit',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  }
});
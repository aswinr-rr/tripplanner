import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { auth } from '../../configs/FirebaseConfig';
import { signOut } from 'firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Profile() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (auth.currentUser) {
            setUserEmail(auth.currentUser.email);
        }
        setLoading(false);
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setIsLoggingOut(true);
    };

    if (isLoggingOut) {
        return <Redirect href="/auth/sign-in" />;
    }

    return (
        <View style={styles.container}>
            {/* Profile Card */}
            <View style={styles.card}>
                {/* Profile Icon */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarBackground}>
                        <Ionicons name="person" size={60} color="white" />
                    </View>
                </View>

                {/* Welcome Text */}
                <Text style={styles.welcomeText}>
                    Welcome 👋
                </Text>

                {/* User Email */}
                {loading ? (
                    <ActivityIndicator size="small" color={Colors.BLUE1} />
                ) : (
                    <Text style={styles.emailText}>{userEmail || 'Email not found'}</Text>
                )}

                {/* Divider */}
                <View style={styles.divider} />

                {/* Options */}
                <TouchableOpacity style={styles.optionButton} onPress={() => alert('Edit Profile feature coming soon!')}>
                    <Ionicons name="create-outline" size={24} color={Colors.DARK_GRAY} />
                    <Text style={styles.optionText}>Edit Profile</Text>
                    <Ionicons name="chevron-forward" size={24} color={Colors.BLUE1} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={() => alert('Settings feature coming soon!')}>
                    <Ionicons name="settings-outline" size={24} color={Colors.DARK_GRAY} />
                    <Text style={styles.optionText}>Settings</Text>
                    <Ionicons name="chevron-forward" size={24} color={Colors.BLUE1} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={() => alert('Help & Support feature coming soon!')}>
                    <Ionicons name="help-circle-outline" size={24} color={Colors.DARK_GRAY} />
                    <Text style={styles.optionText}>Help & Support</Text>
                    <Ionicons name="chevron-forward" size={24} color={Colors.BLUE1} />
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={20} color="white" />
                    <Text style={styles.logoutText}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.WHITE, // Changed from BLUE1 to WHITE
    },
    card: {
        backgroundColor: Colors.WHITE,
        borderRadius: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 10,
        width: '90%',
        paddingVertical: 30,
        paddingHorizontal: 15,
    },
    avatarContainer: {
        marginBottom: 20,
    },
    avatarBackground: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BLUE1,
        shadowColor: Colors.BLUE1,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    welcomeText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginBottom: 8,
    },
    emailText: {
        fontSize: 16,
        color: Colors.DARK_GRAY,
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.LIGHT_GRAY,
        width: '90%',
        marginVertical: 15,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        width: '100%',
        paddingHorizontal: 20,
        borderRadius: 12,
        marginVertical: 5,
    },
    optionText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        color: Colors.DARK_GRAY,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 15,
        backgroundColor: '#ff4757',
        marginTop: 30,
        width: '80%',
        shadowColor: '#ff4757',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
});
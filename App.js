import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'; // If you are using React Navigation
import HomeScreen from './HomeScreen'; // Import your screens

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <HomeScreen />
                {/* Add other screens or components here */}
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
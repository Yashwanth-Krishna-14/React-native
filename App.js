// App.js or wherever your navigation is set up
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
 import { createDrawerNavigator } from '@react-navigation/drawer'; 
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import NewChatScreen from './screens/newChatScreen';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Chat" component={ChatScreen} />
                <Drawer.Screen name="NewChat" component={NewChatScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}



/* 
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen'; // Import your LoginScreen component
import SignupScreen from './screens/SignupScreen'; // Import your SignupScreen component

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Signup" 
                    component={SignupScreen} 
                    options={{ title: 'Sign Up' }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
} */
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
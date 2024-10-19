import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image, Platform,SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import io from 'socket.io-client';

const ChatScreen = ({ route }) => {
    const { userName } = route.params;
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newsocket = io.connect("YOUR_SOCKET_SERVER_URL"); // Replace with your socket server URL
        setSocket(newsocket);

        newsocket.on('connect', () => {
            console.log(`Connected to chat as ${userName}`);
        });

        newsocket.on("new_message", (msg) => {
            setMessages(prevMessages => [msg, ...prevMessages]);
        });

        return () => {
            newsocket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (messageText.trim()) {
            const newMessage = {
                id: Math.random().toString(),
                text: messageText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format without seconds
                senderId: userName // Use the username or ID of the sender
            };
            socket.emit("send_message", newMessage);
            setMessages(prevMessages => [newMessage, ...prevMessages]);
            setMessageText('');
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newMessage = {
                id: Math.random().toString(),
                imageUri: result.assets[0].uri,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format without seconds
                senderId: userName
            };
            socket.emit("send_message", newMessage);
            setMessages(prevMessages => [newMessage, ...prevMessages]);
        }
    };

    const renderMessageItem = ({ item }) => (
        <SafeAreaView style={[styles.messageContainer, item.senderId === userName ? styles.sent : styles.received]}>
            {item.imageUri ? (
                <Image source={{ uri: item.imageUri }} style={styles.image} />
            ) : (
                <>
                    <Text style={styles.messageText}>{item.text}</Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                </>
            )}
        </SafeAreaView>
    );

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100} // Adjust this value based on your header height
        >
            <FlatList
                data={messages}
                renderItem={renderMessageItem}
                keyExtractor={(item) => item.id}
                inverted
                contentContainerStyle={{ paddingBottom: 20 }} // Adds padding to the bottom of the FlatList
            />
            <SafeAreaView style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder="Type a message"
                    onSubmitEditing={sendMessage}
                />
                <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
                    <MaterialIcons name="photo" size={24} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
                    <MaterialIcons name="send" size={24} color="#007AFF" />
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    messageContainer: {
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        maxWidth: '80%',
    },
    sent: {
        backgroundColor: '#d1e7dd',
        alignSelf: 'flex-end',
    },
    received: {
        backgroundColor: '#f8d7da',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
        textAlign: 'right',
        marginTop: 5,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginTop: 5,
    },
    inputContainer: {
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal :10 ,
        paddingBottom :20 , // Add padding to create space between the keyboard and input box
        marginBottom :30 , // Add margin to elevate the input box from bottom
    },
    input:{
       flex :1 ,
       height :50 ,
       borderRadius :30 ,
       backgroundColor:'#f0f0f0' ,
       paddingHorizontal :20 ,
       marginRight :10 // Add margin to create space between input and buttons
   },
   iconButton:{
       marginLeft :10 , // Add margin to create space between buttons
   }
});

export default ChatScreen;
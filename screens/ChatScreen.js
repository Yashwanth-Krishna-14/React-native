import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image, Platform, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import io from 'socket.io-client';

const ChatScreen = ({ route }) => {
    const { userName } = route.params;
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [socket, setSocket] = useState(null);
    const flatListRef = useRef(null);

    useEffect(() => {
        const newsocket = io.connect("YOUR_SOCKET_SERVER_URL"); // Replace with your socket server URL
        setSocket(newsocket);

        newsocket.on('connect', () => {
            console.log(`Connected to chat as ${userName}`);
        });

        newsocket.on("new_message", (msg) => {
            setMessages(prevMessages => [msg, ...prevMessages]);
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
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
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                senderId: userName
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
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
            keyboardVerticalOffset={100}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{userName}</Text>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessageItem}
                keyExtractor={(item) => item.id}
                inverted
                contentContainerStyle={{ paddingBottom: 20 }}
            />
            
            <SafeAreaView style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder="Type a message"
                    returnKeyType="done"
                    onSubmitEditing={() => {}}
                    blurOnSubmit={false}
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
    },
    header: {
        backgroundColor: '#e6f7ff', // Primary blue color
        paddingVertical: 15,
        alignItems: 'center',
    },
    headerTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    messageContainer: {
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        maxWidth: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    sent: {
        backgroundColor: '#45A5FF', // Sent messages in blue
        alignSelf: 'flex-end',
    },
    received: {
        backgroundColor: '#f0f0f0', // Received messages in light gray
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        color:'black', // White text for sent messages
    },
    timestamp:{
       fontSize :12 ,
       color:'black', // White timestamp for sent messages
       textAlign:'right',
       marginTop : 5,
   },
   image:{
       width : 300,
       height : 300,
       borderRadius : 10,
       marginTop : 5,
   },
   inputContainer:{
       flexDirection:'row',
       alignItems:'center',
       paddingHorizontal :10 ,
       paddingBottom :10 ,
   },
   input:{
       flex :1 ,
       height :50 ,
       borderRadius :30 ,
       backgroundColor:'#e6f7ff', // Light blue input field
       paddingHorizontal :20 ,
       marginRight :10 ,
   },
   iconButton:{
       marginLeft :8 ,
   }
});

export default ChatScreen;
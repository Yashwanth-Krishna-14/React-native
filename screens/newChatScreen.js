import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NewChatScreen = ({ navigation }) => {
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');

    const startChat = () => {
        // Navigate to the chat screen with recipient and message
        navigation.navigate('Chat', { userName: recipient, initialMessage: message });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>New Chat</Text>
            <TextInput
                style={styles.input}
                placeholder="Recipient Name"
                value={recipient}
                onChangeText={setRecipient}
            />
            <TextInput
                style={styles.input}
                placeholder="Type your message"
                value={message}
                onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.button} onPress={startChat}>
                <Text style={styles.buttonText}>Start Chat</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#f9f9f9', // Light background color
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF', // Primary blue color
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#007AFF', // Blue border for inputs
        borderWidth: 1,
        borderRadius: 30,
        marginBottom: 12,
        paddingHorizontal: 20,
        backgroundColor: '#fff', // White background for inputs
    },
    button: {
        backgroundColor: '#007AFF', // Blue background for button
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff', // White text for button
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default NewChatScreen;
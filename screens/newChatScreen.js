// NewChatScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const NewChatScreen = ({ navigation }) => {
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');

    const startChat = () => {
        // Navigate to the chat screen with recipient and message
        navigation.navigate('Chat', { userName: recipient, initialMessage: message });
    };

    return (
        <View style={styles.container}>
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
            <Button title="Start Chat" onPress={startChat} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
});

export default NewChatScreen;
import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [chats] = useState([
        // Add your chat data here (7 members)
        { id: '1', name: 'John Doe', lastMessage: 'Hey! How are you?', timestamp: '10:30 AM', avatar: 'https://via.placeholder.com/40' },
        { id: '2', name: 'John Doe', lastMessage: 'Hey! How are you?', timestamp: '10:30 AM', avatar: 'https://via.placeholder.com/40' },
        // ... other members
    ]);

    const filteredChats = chats.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderChatItem = ({ item }) => (
        <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('Chat', { userName: item.name })}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredChats}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 80 }} // Ensure space for FAB
            />
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('newChatScreen')}>
                <MaterialIcons name="chat" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    chatInfo: {
        flexGrow: 1,
    },
    chatName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    lastMessage: {
        fontSize: 14,
        color:'#666',
    },
    timestamp:{
       fontSize :12 ,
       color:'#888',
   },
    fab:{
       position:'absolute',
       bottom :30 ,
       right :30 ,
       backgroundColor:'#007AFF',
       borderRadius :50 ,
       padding :16 ,
       elevation :5 ,
   },
});

export default HomeScreen;
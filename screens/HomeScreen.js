import React, { useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [chats] = useState([
        { id: '1', name: 'John Doe', lastMessage: 'Hey! How are you?', timestamp: '10:30 AM', avatar: 'https://via.placeholder.com/40' },
        { id: '2', name: 'Jane Smith', lastMessage: 'See you later!', timestamp: '09:15 AM', avatar: 'https://via.placeholder.com/40' },
        { id: '3', name: 'Alice Johnson', lastMessage: 'Let’s catch up!', timestamp: '08:45 AM', avatar: 'https://via.placeholder.com/40' },
        { id: '4', name: 'Bob Brown', lastMessage: 'Are we still on for lunch?', timestamp: '07:50 AM', avatar: 'https://via.placeholder.com/40' },
        { id: '5', name: 'Charlie Davis', lastMessage: 'Good morning!', timestamp: '06:30 AM', avatar: 'https://via.placeholder.com/40' },
        { id: '6', name: 'Diana Prince', lastMessage: 'What’s the plan for today?', timestamp: '05:20 AM', avatar: 'https://via.placeholder.com/40' },
        { id: '7', name: 'Ethan Hunt', lastMessage: 'Mission accomplished!', timestamp: '04:10 AM', avatar: 'https://via.placeholder.com/40' },
        { id: '8', name: 'Frank Castle', lastMessage: "Can't wait for the weekend!", timestamp: '03:00 AM', avatar: 'https://via.placeholder.com/40' },
        { id: '9', name: 'Grace Hopper', lastMessage: "Just finished the project!", timestamp: '02:00 AM', avatar: 'https://via.placeholder.com/40' },
        { id: '10', name: 'Hank Pym', lastMessage: "Let's meet at 5 PM.", timestamp: '01:00 AM', avatar: 'https://via.placeholder.com/40' },
    ]);

    const filteredChats = chats.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderChatItem = ({ item }) => (
        <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('Chat', { userName: item.name })}>
            <Image source={{ uri:item.avatar }} style={styles.avatar} />
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
            <ScrollView contentContainerStyle={{ paddingBottom : 80 }}>
                {filteredChats.length === 0 ? (
                    <Text style={styles.noChats}>No chats found</Text>
                ) : (
                    filteredChats.map(chat => renderChatItem({ item: chat }))
                )}
            </ScrollView>
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NewChat')}>
                <MaterialIcons name="chat" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex : 1,
        paddingHorizontal : 16,
        paddingTop : 16,
        backgroundColor:'#f9f9f9',
    },
    searchBar:{
        height : 40,
        borderColor : '#ccc',
        borderWidth : 1,
        borderRadius : 8,
        paddingHorizontal : 10,
        marginBottom : 16,
    },
    chatItem:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical : 12,
        borderBottomWidth : 1,
        borderBottomColor : '#eee',
    },
    avatar:{
        width : 40,
        height : 40,
        borderRadius : 20,
        marginRight : 12,
    },
    chatInfo:{
       flexGrow : 1,
    },
    chatName:{
       fontSize : 18,
       fontWeight :'bold',
    },
    lastMessage:{
       fontSize : 14,
       color:'#666',
    },
    timestamp:{
       fontSize :12 ,
       color:'#888',
   },
   noChats:{
       textAlign:'center',
       marginTop : 20,
       fontSize : 16,
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
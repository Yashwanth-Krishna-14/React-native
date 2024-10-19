import React from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const chats = [
    { id: '1', name: 'John Doe', lastMessage: 'Hey! How are you?', unreadCount: 2, avatar: 'https://via.placeholder.com/40' },
    { id: '2', name: 'Jane Smith', lastMessage: 'See you later!', unreadCount: 0, avatar: 'https://via.placeholder.com/40' },
    // Add more chat data here
  ];

  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('Chat', { userName: item.name })}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      {item.unreadCount > 0 && (
        <View style={styles.unreadCount}>
          <Text style={styles.unreadText}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder="Search" />
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NewChat')}>
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
    color: '#666',
  },
  unreadCount: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginLeft: 'auto',
  },
  unreadText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 5,
  },
});

export default HomeScreen;
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ProfileImage({ uri }) {
  return (
    <View style={styles.avatarContainer}>
      <Image source={{ uri }} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

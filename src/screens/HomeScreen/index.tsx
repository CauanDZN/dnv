import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo(a) ao DNV!</Text>
      <Text style={styles.text}>Nosso app de denúncias veiculares.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bfbfbf',
  },
  text: {
    color: '#000000'
  }
});

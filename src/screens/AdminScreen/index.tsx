import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AdminScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela do(a) admin</Text>
      <Text style={styles.p}>Aqui o admin verá o histórico e prosseguir com a denúncia.</Text>
      <Text style={styles.p}>Tela em construção, pois é necessário implementar o banco de dados.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bfbfbf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  p: {
    textAlign: 'center',
    fontSize: 16,
  }
});
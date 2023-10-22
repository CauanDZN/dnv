import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen() {
  const navigation = useNavigation();

  const handleNavigateToSignUp = () => {
    navigation.navigate('Cadastro'); // 'SignUp' deve ser o nome da tela de cadastro em seu Navigator
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SignIn</Text>
      <Button title="Cadastrar" onPress={handleNavigateToSignUp} />
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
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
});

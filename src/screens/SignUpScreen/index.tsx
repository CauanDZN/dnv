import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../auth/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();

  const { login } = useAuth();
  const navigation = useNavigation();

  const handleSignUp = async () => {
    // Valide os dados de entrada (por exemplo, se o nome de usuário e a senha são válidos)

    // Crie um objeto de usuário com os dados
    const user = {
      username,
      password,
    };

    // Simule a autenticação (substitua pelo seu mecanismo real)
    // Aqui, estamos assumindo que o login é bem-sucedido e retornamos um token de exemplo.
    const token = 'exemplo_de_token'; // Substitua pelo token real

    // Armazene o token no AsyncStorage e no contexto de autenticação
    try {
      await AsyncStorage.setItem('userToken', token); // Armazena o token no AsyncStorage
      login(token); // Armazena o token no contexto
      console.log('Cadastro bem-sucedido!');

      // Redirecione o usuário para a tela 'Home' no TabNavigator
      navigation.navigate('Home'); // Use o nome da tela, não a rota
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Cadastrar" onPress={handleSignUp} />
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
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

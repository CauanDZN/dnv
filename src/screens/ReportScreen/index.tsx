import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import Modal from 'react-native-modal';
import Toastable, { showToastable } from 'react-native-toastable';
import { MaterialIcons } from '@expo/vector-icons'; // Importe o ícone da câmera

const ReportScreen = () => {
  const [plate, setPlate] = useState('');
  const [activity, setActivity] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  // Dentro da função ReportScreen, adicione um estado para controlar a exibição do toast
  const [isToastVisible, setIsToastVisible] = useState(false);

  const sendReport = () => {
    showToastable({
      title: 'Denúncia enviada com sucesso!',
      message: '', // Adicione uma mensagem vazia ou a mensagem que deseja exibir
      status: 'success',
    });

    setPlate('');
    setActivity('');
  };

   // Função para capturar a foto
   const takePhoto = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync({});
      setPhotoUri(uri);
      setIsCameraActive(false);
    }
  };

  // Função para verificar e solicitar permissão da câmera
  const checkCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === 'granted');
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    button: {
      backgroundColor: 'blue',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    textInput: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      marginVertical: 10,
      width: '100%',
    },
    submitButton: {
      backgroundColor: 'yellow',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitButtonText: {
      color: 'black',
      fontSize: 18,
    },
    cameraButton: {
      backgroundColor: 'orange',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8
    },
  });

  return (
    <View style={styles.container}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={{ width: 200, height: 200, marginBottom: 10 }} />
      ) : (
        <View>
          {hasCameraPermission ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setIsCameraActive(true)}
              >
                <Text style={styles.buttonText}>Tirar Foto</Text>
              </TouchableOpacity>
              <Modal isVisible={isCameraActive}>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Camera ref={cameraRef} style={{ flex: 1 }}>
                    {/* Move o botão de tirar foto para a parte inferior */}
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                      <TouchableOpacity onPress={takePhoto} style={styles.cameraButton}>
                        <MaterialIcons name="photo-camera" size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                  </Camera>
                </View>
                <Button title="Fechar Câmera" onPress={() => setIsCameraActive(false)} />
              </Modal>
            </>
          ) : (
            <Text>Você não concedeu permissão para a câmera.</Text>
          )}
        </View>
      )}

      <TextInput
        style={styles.textInput}
        placeholder="Digite a placa do veículo"
        value={plate}
        onChangeText={(text) => setPlate(text)}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Atividade Suspeita"
        value={activity}
        onChangeText={(text) => setActivity(text)}
        multiline
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={sendReport}
      >
        <Text style={styles.submitButtonText}>Enviar Denúncia</Text>
      </TouchableOpacity>

      {/* Inclua o componente Toastable no final do seu componente */}
      <Toastable />
    </View>
  );
};

export default ReportScreen;

import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';
import { exportEmergency } from '../../components/ExportFile';

export default function Emergency() {

  const [address, setAddress]: any = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        showToastError
        return;
      }

      await Location.enableNetworkProviderAsync();
    })();
  }, []);

  const showToastSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Pedido de Emergência',
      text2: 'Chamado de emergência enviado às autoridades...',
      visibilityTime: 6000,
    });
  }

  const showToastError = () => {
    Toast.show({
      type: 'error',
      text1: 'Falha ao obter localização',
      text2: 'Favor permitir o acesso à sua localização para conseguir utilizar o app...',
      visibilityTime: 6000,
    });
  }

  const [timeoutId, setTimeoutId]: any = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isPressedFinished, setIsPressedFinished] = useState(false);
  const [borderColor, setBorderColor] = useState(Colors.details);

  let intervalId: any;
  const handlePressIn = () => {
    try {
      setIsPressed(true);
      intervalId = setInterval(() => {
        setBorderColor((prevColor) => (prevColor === Colors.details ? Colors.red : Colors.details));
      }, 450);
      const id: any = setTimeout(async () => {
        if (Location.PermissionStatus.GRANTED) {
          clearInterval(intervalId);
          setIsPressedFinished(true);

          let location: any = await Location.getCurrentPositionAsync({});
          let address: any = await Location.reverseGeocodeAsync(location.coords);
          setAddress(address);
          exportEmergency(address);
          showToastSuccess();
        }
        else {
          showToastError();
        }
      }, 3000);
      setTimeoutId(id);
    }
    catch (error) {
      console.log(error);
      showToastError();
    }
  };

  const handlePressOut = () => {
    setIsPressed(false);
    setIsPressedFinished(false);
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  };

  return (
    <ScrollView contentContainerStyle={styles.Main}>
      <Header />
      <Text style={styles.Title}>BOTÃO DE EMERGÊNCIA</Text>
      <Text style={styles.Subtitle}>Pressione e segure por 3 segundos para acionar...</Text>
      <View style={styles.Form}>
        <TouchableOpacity
          style={[styles.EmergencyButton, isPressed && { borderColor: borderColor }, isPressedFinished && { borderColor: Colors.primary }]}
          activeOpacity={0.5}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.EmergencyText}>EMERGÊNCIA</Text>
          <MaterialCommunityIcons name="gesture-tap-hold" size={35} color="red" />
        </TouchableOpacity>
        <Text style={styles.Warning}>Utilize apenas em casos reais de emergência escolar!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    paddingHorizontal: "2.5%",
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  Form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginTop: 10,
  },
  Subtitle: {
    fontSize: 16,
    color: Colors.details,
  },
  Warning: {
    fontSize: 15,
    color: Colors.red,
    fontWeight: "bold",
    paddingTop: 20,
    //borderBottomWidth: 0.2,
    borderColor: Colors.red,
  },
  Text: {
    width: "100%",
    color: "#000",
    fontSize: 30,
  },
  EmergencyButton: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#fff",
    height: 300,
    width: 300,
    borderColor: "#d6d6d6",
    borderWidth: 5,
    borderRadius: 300,
    overflow: 'hidden'
  },
  PressedEmergencyButton: {
    borderColor: Colors.red,
  },
  EmergencyText: {
    color: Colors.red,
    fontSize: 40,
    fontWeight: "bold",
  },
});

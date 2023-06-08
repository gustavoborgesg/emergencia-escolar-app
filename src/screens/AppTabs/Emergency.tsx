import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/Colors';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';
import { exportEmergency } from '../../components/ExportFile';
import EmergencyButton from '../../components/Buttons/EmergencyButton';

export default function Emergency() {

  const [address, setAddress]: any = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        showToastPermissionDenied();
        return;
      }
      await Location.enableNetworkProviderAsync();
    })();
  }, []);

  const showToastEmergencySent = () => {
    Toast.show({
      type: 'success',
      text1: 'Pedido de Emergência',
      text2: 'Chamado de emergência enviado às autoridades...',
      visibilityTime: 5000,
    });
  }

  const showToastEmergencyError = (error: unknown) => {
    Toast.show({
      type: 'error',
      text1: 'Falha ao enviar pedido de emergência',
      text2: 'Não foi possível enviar o pedido de emergência devido ao erro: ' + "\n" + error,
      visibilityTime: 5000,
    });
  }

  const showToastPermissionDenied = () => {
    Toast.show({
      type: 'error',
      text1: 'Falha ao obter localização',
      text2: 'Favor permitir o acesso à sua localização para conseguir utilizar o app...',
      visibilityTime: 5000,
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
          exportEmergency(location.coords, address);
          showToastEmergencySent();
        }
        else {
          showToastPermissionDenied();
        }
      }, 3000);
      setTimeoutId(id);
    }
    catch (error) {
      showToastEmergencyError(error);
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
        <EmergencyButton
          handlePressIn={() => handlePressIn()}
          handlePressOut={() => handlePressOut()}
          borderColor={borderColor}
          isPressed={isPressed}
          isPressedFinished={isPressedFinished}
        />
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
    fontSize: 26,
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
    borderColor: Colors.red,
  },
  Text: {
    width: "100%",
    color: "#000",
    fontSize: 30,
  },
});

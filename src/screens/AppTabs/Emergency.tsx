import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message';

export default function Emergency() {

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Pedido de Emergência',
      text2: 'Chamado de emergência enviado às autoridades...'
    });
  }

  const [timeoutId, setTimeoutId]: any = useState(null);

  const handlePressIn = () => {
    const id: any = setTimeout(() => {
      // Ação acionada após 3 segundos de pressionamento contínuo
      console.log('Ação acionada!');
      showToast();
    }, 3000);
    setTimeoutId(id);
  };

  const handlePressOut = () => {
    clearTimeout(timeoutId);
  };

  return (
    <View style={styles.Main}>
      <Header />
      <Text style={styles.Title}>BOTÃO DE EMERGÊNCIA</Text>
      <Text style={styles.Subtitle}>Pressione e segure por 3 segundos para acionar...</Text>
      <View style={styles.Form}>
        <TouchableOpacity
          style={styles.EmergencyButton}
          activeOpacity={0.7}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.EmergencyText}>EMERGÊNCIA</Text>
          <MaterialCommunityIcons name="gesture-tap-hold" size={35} color="red" />
        </TouchableOpacity>
        <Text style={styles.Warning}>Utilize apenas em casos reais de emergência escolar!</Text>
      </View>
    </View>
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
  EmergencyText: {
    color: Colors.red,
    fontSize: 40,
    fontWeight: "bold",
  },
});

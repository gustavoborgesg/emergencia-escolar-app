import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/Colors';

export default function Emergency() {
  return (
    <View style={styles.Main}>
      <Header />
      <Text style={styles.Title}>Botão de emergência</Text>
      <Text style={styles.Subtitle}>Pressione e segure por 3 segundos...</Text>
      <View style={styles.Form}>
        <TouchableOpacity style={styles.EmergencyButton}>
          <Text style={styles.EmergencyText}>Emergência</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
  },
  Form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Title: {
    fontSize: 30,
    color: "#000",
  },
  Subtitle: {
    fontSize: 20,
    color: "#000",
  },
  Warning: {
    color: Colors.red,
    fontWeight: "bold",
  },
  Text: {
    width: "100%",
    color: "#000",
    fontSize: 30,
  },
  EmergencyButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    borderWidth: 3,
    borderRadius: 999,
  },
  EmergencyText: {
    color: Colors.red,
    fontSize: 50,
  },
});

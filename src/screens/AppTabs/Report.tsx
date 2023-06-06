import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import GlobalStyles from '../../../assets/styles/GlobalStyles';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/Colors';

export default function Report() {
  return (
    <View style={styles.Main}>
      <Header />
      <Text style={styles.Text}>Teste</Text>
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

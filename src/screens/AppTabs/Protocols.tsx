import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import GlobalStyles from '../../../assets/styles/GlobalStyles';
import Header from '../../components/Header';

export default function Protocols() {
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
    backgroundColor: "#fff",
    alignItems: "center",
  },
  Text: {
    color: "#000",
    fontSize: 50,
  }
});

import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';

export default function About() {
  return (
    <View style={styles.Main}>
      <Header />
      <Text style={styles.Text}>Botão de emergência</Text>
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
  Text: {
    width: "100%",
    color: "#000",
    fontSize: 30,
  }
});

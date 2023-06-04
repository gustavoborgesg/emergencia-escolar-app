import { SafeAreaView, StyleSheet } from 'react-native';
import GlobalStyles from '../../../assets/styles/GlobalStyles';

export default function Report() {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

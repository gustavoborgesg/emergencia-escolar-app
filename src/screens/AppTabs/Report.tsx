import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import GlobalStyles from '../../../assets/styles/GlobalStyles';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';

export default function Report() {

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
      }, 350);
      const id: any = setTimeout(async () => {
        if (Location.PermissionStatus.GRANTED) {
          clearInterval(intervalId);
          setIsPressedFinished(true);

          let location: any = await Location.getCurrentPositionAsync({});
          let address: any = await Location.reverseGeocodeAsync(location.coords);
          setAddress(address);
          console.log(address);

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

  const [errors, setErrors] = useState({
    bodyText: "",
    files: "",
  });

  const handleError = (error: any, input: any) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const [bodyText, setBodyText] = useState();
  const [files, setFiles] = useState();

  const handleOnchange = (text: any) => {
    setBodyText(text);
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!bodyText) {
      handleError('Campo obrigatório', 'bodyText');
      isValid = false;
    }

    if (!files) {
      handleError('Campo obrigatório', 'files');
      isValid = false;
    }

    if (isValid) {

    }
  }

  return (
    <View style={styles.Main}>
      <Header />
      <Text style={styles.Title}>REALIZAR DENÚNCIA</Text>
      <Text style={styles.Subtitle}>Insira toda informação que possam ser relevantes...</Text>
      <View style={styles.Form}>
        <CustomTextInput
          label={"Texto"}
          placeholder={"Informações..."}
          value={bodyText}
          error={errors.bodyText}
          onChangeText={(text: any) => handleOnchange(text)}
          onFocus={[() => handleError(null, 'bodyText')]}
          returnKeyType="next"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%", marginTop: 30, }}>
          <CustomButton
            text={"Enviar"}
            textColor={Colors.primary}
            backgroundColor={Colors.white}
            onPress={() => validate()}
          />
          <CustomButton
            text={"Limpar"}
            textColor={Colors.red}
            backgroundColor={Colors.white}
            onPress={() => validate()}
          />
        </View>
        <Text style={styles.Warning}>Utilize apenas em casos reais de suspeita!</Text>
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
    width: "100%",
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

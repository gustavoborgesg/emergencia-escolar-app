import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard, ScrollView } from 'react-native';
import GlobalStyles from '../../../assets/styles/GlobalStyles';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import * as DocumentPicker from 'expo-document-picker';

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

  const [bodyText, setBodyText] = useState("");
  const [files, setFiles]: any = useState(null);

  const handleOnChange = (text: any) => {
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
      //manda para o servidor
    }
  }

  const selectFiles = async () => {
    try {
      const files = await DocumentPicker.getDocumentAsync({});
      setFiles(files);
      console.log(files);
    } catch (error) {
      console.log(error);
    }
  }

  const clean = () => {
    setBodyText("");
    setFiles(null);
  }

  return (
    <ScrollView contentContainerStyle={styles.Main}>
      <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
        <Header />
        <Text style={styles.Title}>REALIZAR DENÚNCIA</Text>
        <Text style={styles.Subtitle}>Insira toda informação que possam ser relevantes...</Text>
        <View style={styles.Form}>
          <CustomTextInput
            label={"Texto"}
            placeholder={"Informações..."}
            value={bodyText}
            error={errors.bodyText}
            onChangeText={(text: any) => handleOnChange(text)}
            onFocus={() => handleError(null, 'bodyText')}
            returnKeyType="next"
          />
          <CustomButton
            text={files == null ? "Selecionar Arquivo 1" : files.name.length >= 20 ? files.name.substring(0, 17).concat("...") : files.name}
            textColor={Colors.primary}
            backgroundColor={Colors.white}
            onPress={() => selectFiles()}
          />
          <CustomButton
            text={files == null ? "Selecionar Arquivo 2" : files.name.length >= 20 ? files.name.substring(0, 17).concat("...") : files.name}
            textColor={Colors.primary}
            backgroundColor={Colors.white}
            onPress={() => selectFiles()}
          />
          <CustomButton
            text={files == null ? "Selecionar Arquivo 3" : files.name.length >= 20 ? files.name.substring(0, 17).concat("...") : files.name}
            textColor={Colors.primary}
            backgroundColor={Colors.white}
            onPress={() => selectFiles()}
          />
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", width: "80%" }}>
            <CustomButton
              text={"Enviar"}
              textColor={Colors.green}
              backgroundColor={Colors.white}
              onPress={() => validate()}
            />
            <CustomButton
              text={"Limpar"}
              textColor={Colors.red}
              backgroundColor={Colors.white}
              onPress={() => clean()}
            />
          </View>
          <Text style={styles.Warning}>Utilize apenas em casos reais de suspeita!</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Main: {
    flexGrow: 1,
    paddingHorizontal: "2.5%",
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  Form: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    //justifyContent: "center",
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

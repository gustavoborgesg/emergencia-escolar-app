import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity, Linking } from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/Colors';
import { SimpleLineIcons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import image1 from '../../../assets/images/conteudo1.png'
import image2 from '../../../assets/images/conteudo2.png'
import image3 from '../../../assets/images/conteudo3.png'
import image4 from '../../../assets/images/conteudo4.png'

const SLIDER_WIDTH = Dimensions.get('window').width * 0.95;

const images = [
  image1,
  image2,
  image3,
  image4
];

function renderItem({ item }: any) {
  return (
    <View style={styles.Carousel} >
      <Image style={styles.Images} source={item} resizeMode={'contain'} />
    </View>
  )
}

export default function Emergency() {

  const handleLink1 = () => {
    const url = 'https://www.jusbrasil.com.br/artigos/procedimentos-em-caso-de-um-ataque-de-atirador-em-escola-ou-ambiente-de-trabalho/685479581';
    Linking.openURL(url);
  };

  const handleLink2 = () => {
    const url = 'https://www.fbi.gov/how-we-can-help-you/safety-resources/active-shooter-safety-resources';
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.Main}>
      <Header />
      <Text style={styles.Title}>PROTOCOLOS DE SEGURANÇA</Text>
      <Text style={styles.Subtitle}>Materiais para auxilio numa eventual emergência...</Text>
      <View style={styles.Form}>
        <Carousel
          data={images}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={SLIDER_WIDTH}
          useScrollView={true}
        />
        <Text style={styles.Text}>Para saber mais sobre o assunto acesse:</Text>
        <View style={{ gap: 20, marginBottom: 20 }}>
          <TouchableOpacity style={styles.ButtonLink} onPress={handleLink1}>
            <SimpleLineIcons name="globe" size={24} color={Colors.primary} />
            <Text style={styles.Link}>Procedimentos em caso de um ataque de atirador em escola ou ambiente de trabalho.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ButtonLink} onPress={handleLink2}>
            <SimpleLineIcons name="globe" size={24} color={Colors.primary} />
            <Text style={styles.Link}>Recursos de segurança para atiradores ativos - FBI</Text>
          </TouchableOpacity>
        </View>
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
  Carousel: {
    width: SLIDER_WIDTH,
    height: "85%",
    backgroundColor: Colors.primary,
    marginTop: 25,
  },
  Images: {
    width: "100%",
    height: "100%",
    borderColor: Colors.primary,
    borderWidth: 0.6,
    borderBottomWidth: 1,
    borderRadius: 1,
  },
  Text: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 15,
  },
  ButtonLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  Link: {
    color: Colors.primary,
    fontSize: 15,
    width: "90%",
    fontWeight: "bold",
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    borderColor: Colors.primary,
  }
});
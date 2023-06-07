import * as FileSystem from 'expo-file-system';
import axios from 'axios';

export const exportFiles = async (text: string, uriArray: any[]) => {
  try {
    const formData = new FormData();

    //Adicionar String
    formData.append('text', text);

    let cont = 0;
    // Adicionar cada arquivo ao objeto FormData
    uriArray.forEach(async (fileUri: any) => {
      // Ler o conteúdo do arquivo como uma string
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      cont += 1;
      formData.append('files', {
        uri: fileUri,
        name: 'file' + cont.toString,
        type: 'multipart/form-data',
        data: fileContent,
      });
    });

    // Envie os arquivos para o servidor usando uma chamada de API
    const response = await axios.post('http://?', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Lide com a resposta do servidor
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
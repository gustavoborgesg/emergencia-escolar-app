import * as FileSystem from 'expo-file-system';
import axios from 'axios';

export const exportFiles = async (text: string, uriArray: any[]) => {
  try {
    const formData = new FormData();
    // Adicionar String
    formData.append('information', text);

    for (let i = 0; i < uriArray.length; i++) {
      const fileUri = uriArray[i];
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      const fileName = 'file' + (i + 1).toString();

      formData.append('files', {
        uri: fileUri,
        name: fileName,
        type: 'multipart/form-data',
        data: fileContent,
      });
    }

    // Envie os arquivos para o servidor usando uma chamada de API
    const response = await axios.post('http://192.168.0.2:8080/report', formData, {
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

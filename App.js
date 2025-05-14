import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [classificacao, setClassificacao] = useState('');

  // calcula o imc
  const calcularIMC = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    //erro que obrioga a ser positivo e maior que 0
    if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      Alert.alert('Erro', 'Insira valores válidos para peso e altura.');
      return;
    }
    // erro que obriga a colocar virgula na altura
    if (!altura.includes('.')) {
    Alert.alert('Erro', 'Use um ponto como separador decimal (ex: 1.75).');
    return;
}


    const imc = pesoNum / (alturaNum * alturaNum);
    const imcFormatado = imc.toFixed(2);
    setResultado(imcFormatado);

    if (imc < 18.5) setClassificacao('Abaixo do peso');
    else if (imc < 25) setClassificacao('Peso normal');
    else if (imc < 30) setClassificacao('Sobrepeso');
    else if (imc < 35) setClassificacao('Obesidade grau I');
    else if (imc < 40) setClassificacao('Obesidade grau II');
    else setClassificacao('Obesidade grau III');
  };

  const limparCampos = () => {
    setPeso('');
    setAltura('');
    setResultado(null);
    setClassificacao('');
  };

  //estrutura visual do app
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (Kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Altura (utilize ponto)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <TouchableOpacity style={styles.botao} onPress={calcularIMC}>
        <Text style={styles.textoBotao}>Calcular</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos}>
        <Text style={styles.textoBotao}>Limpar</Text>
      </TouchableOpacity>

      {resultado && (
        <Text style={styles.resultado}>
          Seu IMC é {resultado} isso indica: {classificacao}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f5',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoLimpar: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultado: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

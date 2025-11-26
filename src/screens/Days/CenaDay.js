import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DESCRICAOCENA } from '../../../assets/json/Semanas';
import { useState } from 'react';
import GlassBox from '../../components/GlassBox';
import TextInput from '../../components/TextInput';
import ButtonPrimary from '../../components/ButtonPrimary';

export default function CenaDay({ path, semanaAtual }) {
  const data = DESCRICAOCENA[path][semanaAtual];

  const quant = Object.keys(data).length - 1;
  const [Cont, setCont] = useState(1);

  const [onde, setOnde] = useState('');
  const [quem, setQuem] = useState('');
  const [acao, setAcao] = useState('');

  const [respostas, setRespostas] = useState([]);

  const cenaKey = `Cena ${Cont}`;
  const textoCena = data[cenaKey];

  function handleNext() {
    const nova = {
      cena: Cont,
      onde,
      quem,
      acao
    };

    setRespostas(prev => [...prev, nova]);

    if (Cont < quant) {
      setOnde('');
      setQuem('');
      setAcao('');
      setCont(Cont + 1);
    } else {
      console.log('Respostas finais:', [...respostas, nova]);
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Cena {Cont}/{quant}</Text>

        <GlassBox>
          <Text>{textoCena}</Text>

          <Text>Onde se passa sua cena?</Text>
          <TextInput
            placeholder="Ex: Escola"
            value={onde}
            onChangeText={setOnde}
          />

          <Text>Quem estava ao seu redor?</Text>
          <TextInput
            placeholder="Ex: Colegas de classe"
            value={quem}
            onChangeText={setQuem}
          />

          <Text>Qual era o contexto ou ação?</Text>
          <TextInput
            placeholder="Ex: Foi o dia em que..."
            value={acao}
            onChangeText={setAcao}
          />
        </GlassBox>

        <ButtonPrimary
          title={Cont >= quant ? 'Concluir' : 'Próximo'}
          onPress={handleNext}
          disabled={false}
          height={40}
        />
      </View>
    </SafeAreaView>
  );
}

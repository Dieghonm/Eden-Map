import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Starting/Track';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';

export default function Track({ onNext }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.pathsContainer}>
        <Text style={styles.sectionTitle}>Os caminhos</Text>
        
        {CAMINHOS.map((path) => (
          <TouchableOpacity
            key={path.id}
            style={[styles.pathButton,{ borderColor: path.color, borderWidth: 2 },]}
            activeOpacity={0.8}
          >
            <Text style={styles.pathText}>
              {path.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ButtonPrimary
        title='Descubra seu caminho'
        onPress={ onNext }
      />
    </View>
  );
}
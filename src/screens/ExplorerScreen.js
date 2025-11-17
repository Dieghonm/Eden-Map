import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/ExplorerScreen';
import Header from './Header/Header';

export default function ExplorerScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handlePress = (option) => {
    console.log(option);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* <Header 
        onHomePress={() => navigation.goBack()}
      /> */}
      
      <View style={styles.content}>
        dentro
        {/* <View style={styles.iconContainer}>
          <Image 
            source={require('../../assets/Logo.png')} 
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Explore livremente o Eden</Text>
          <Text style={styles.subtitle}>
            Aqui você poderá acompanhar o <Text style={styles.highlight}>seu progresso</Text>, 
            e até mesmo acessar conteúdo de <Text style={styles.highlight}>outros caminhos</Text>.
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => handlePress('Vídeos')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Vídeos</Text>
            <View style={[styles.iconCircle, { backgroundColor: '#45A7F8' }]}>
              <Image 
                source={require('../../assets/icons/Play.png')} 
                style={styles.buttonIcon}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => handlePress('Missões')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Missões</Text>
            <View style={[styles.iconCircle, { backgroundColor: '#FFAA2E' }]}>
              <Text style={styles.starIcon}>⭐</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => handlePress('Meditações')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Meditações</Text>
            <View style={[styles.iconCircle, { backgroundColor: '#EA5959' }]}>
              <Text style={styles.yinYangIcon}>☯</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => handlePress('Reflexões')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Reflexões</Text>
            <View style={[styles.iconCircle, { backgroundColor: '#38C197' }]}>
              <Text style={styles.spiralIcon}>🌀</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}
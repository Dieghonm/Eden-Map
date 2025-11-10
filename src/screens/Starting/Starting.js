import React, { useState } from 'react';
import { View,Text } from 'react-native';
import Logo from '../../components/Logo';
import WelcomeText from '../../components/WelcomeText';
import PlayButton from '../../components/PlayButton';

export default function Starting() {

  return (
    <View >
      <Logo />
      <WelcomeText title={'Introdução'} subtitle={'No Eden Map, sua jornada começa com um desejo profundo.'} />
      <Text >Escute o áudio de 2 min abaixo e descubra a melhor maneira de fazer seu desejo.</Text>
      <PlayButton status = {true} text = {'Tutorial - Desejo'}/>
    </View>
  );
}
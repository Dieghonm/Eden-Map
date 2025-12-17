import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { horizontalScale } from '../utils/responsive';
import ButtonPrimary from './ButtonPrimary';


export default function VideoPlayer({
  videoId,
  height = horizontalScale(165),
  width = horizontalScale(260),
  play,
  onChangeState,
  title = '', 
  onPress, 
}) {

  const openYoutube = () => {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    Linking.openURL(url);
  };

  return (
    <>
      <View style={{ height: height * 1.53  }} />
      <View style={[styles.fixedContainer, { height }]}>
        <View style={[styles.playerWrapper, { height, width }]}>
          <YoutubeIframe
            videoId={videoId}
            height={height}
            width={width}
            play={play}
            onChangeState={onChangeState}
          />
        <ButtonPrimary 
          title={"Assistir no Youtube"}
          onPress={openYoutube}
          width = {250}
          height = {45}
          
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fixedContainer: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
    elevation: 10,
  },

  playerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

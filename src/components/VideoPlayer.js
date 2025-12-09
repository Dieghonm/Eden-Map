import React from 'react';
import { View, StyleSheet } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { horizontalScale } from '../utils/responsive';


export default function VideoPlayer({
  videoId,
  height = 200,
  width = horizontalScale(260),
  play,
  onChangeState,
}) {
  return (
    <>
      <View style={{ height: height - 45 }} />
      <View style={[styles.fixedContainer, { height }]}>
        <View style={[styles.playerWrapper, { height, width }]}>
          <YoutubeIframe
            videoId={videoId}
            height={height}
            width={width}
            play={play}
            onChangeState={onChangeState}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fixedContainer: {
    position: 'absolute',
    top: 60,
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


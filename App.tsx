import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Video, ResizeMode } from 'expo-av';

export default function App() {
  const [videoFinished, setVideoFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoFinished(true);
    }, 4200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <WebView
        source={{ uri: 'https://susurroai.lovable.app' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        backgroundColor="#000000"
      />
      {!videoFinished && (
        <View style={styles.videoContainer}>
          <Video
            source={require('./assets/intro.mp4')}
            style={StyleSheet.absoluteFill}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping={false}
            isMuted={false}
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded && status.didJustFinish) {
                setVideoFinished(true);
              }
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  webview: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: 999,
  },
});

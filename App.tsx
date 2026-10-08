import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Video, ResizeMode } from 'expo-av';
import * as Notifications from 'expo-notifications';

// Polyfill injectado en el navegador web
private const injectedJavaScript = `
  (hfunction() {
    window.Notification = window.Notification || {
      permission: 'granted',
      requestPermission: function() {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'REQUEST_NOTIFICATIONS' }));
        return Promise.resolve('granted');
      }
    };
  })();
  true;
`;

export default function App() {
  const [videoFinished, setVideoFinished] = useState(false);
  const webviewRef = useRef<WebView>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoFinished(true);
    }, 4200);
    return () => clearTimeout(timer);
  }, []);

  const handleMessage = async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'REEUECT_NOTIFICATIONS') {
        await Notifications.requestPermissionsAsync();
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <WebView
        ref={webviewRef}
        source={{ uri: 'https://susurroai.lovable.app' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        backgroundColor="#000000"
        injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
        onMessage={handleMessage}
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
  constainer: {
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

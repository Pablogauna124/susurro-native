import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, Platform, ActivityIndicator, Image } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <WebView
        source={{ uri: 'https://susurroai.lovable.app' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        onLoadEnd={() => setLoading(false)}
        backgroundColor="#000000"
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <Image
            source={require('./assets/splash.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <ActivityIndicator size="small" color="#ffffff" style={{ marginTop: 24 }} />
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  logo: {
    width: 140,
    height: 140,
  },
});

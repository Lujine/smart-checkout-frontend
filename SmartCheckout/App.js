import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import QR from './views/Barcode';
import Login from './views/login/login'
export default function App() {
  return (
    <View style={styles.container}>
      <Login />
      {/* <Text>Open up App.js to start working on your app!</Text>
      <QR/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

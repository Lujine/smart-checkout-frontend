import React from 'react';
import { Platform, StatusBar, /*Image*/ } from 'react-native';
// import { AppLoading } from 'expo';
// import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';

import AppContainer from './navigation/Screens';
import { materialTheme } from './constants/';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    return (
      <GalioProvider theme={materialTheme}>
        <Block flex>
          {Platform.OS === 'android' && <StatusBar barStyle="default" />}
          <AppContainer />
        </Block>
      </GalioProvider>
    );
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
};

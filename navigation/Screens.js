import React from 'react';
import { Easing, Animated, Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Block, Text, theme } from "galio-framework";
import Barcode from '../views/Barcode';
import Welcome from '../views/Welcome';
import Login from '../views/User/login/login'
import Register from '../views/User/register/register'
import Profile from '../views/User/profile/profile'
import Store from '../views/Store/stores'

import Menu from './Menu';
import Header from '../components/Header';
import { Drawer } from '../components/';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index
    const width = layout.initWidth
    
    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    })
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1],
    })
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    })

    const scaleWithOpacity = { opacity }
    const screenName = "Search"

    if (screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] }
  }
})

const HomeStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: ({ navigation }) => ({
      header: <Header transparent title="Welcome" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  LogIn: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: <Header back transparent title="Log In" icon="arrow-back" family='MaterialIcons' navigation={navigation} />,
      // headerTransparent: true,
    })
  },
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      header: <Header back transparent title="Register" icon="arrow-back" family='MaterialIcons' navigation={navigation} />,
      headerTransparent: true,
    }) 
  },
}, 
{
  initialRouteName: 'Welcome',
},
{
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
});

const DrawerStack = createDrawerNavigator({
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: <Header transparent title="Profile" navigation={navigation} />,
        headerTransparent: true,
      })
    },
    Barcode: {
      screen: Barcode,
      navigationOptions: ({ navigation }) => ({
        header: <Header transparent title="Scan your Barcode" navigation={navigation} />,
        headerTransparent: true,
      })
    },
    Store: {
      screen: Store,
      navigationOptions: ({ navigation }) => ({
        header: <Header transparent title="Store" navigation={navigation} />,
        headerTransparent: true,
      })
    },
  },
  {
    cardStyle: { backgroundColor: '#EEEEEE', },
    transitionConfig,
  },
  Menu
);

const AppStack = createSwitchNavigator({
  Home: HomeStack,
  Drawer: DrawerStack,
},
{
  initialRouteName: 'Home'
})

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
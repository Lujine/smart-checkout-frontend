import React from 'react';
import { Easing, Animated, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Block, Text, theme } from "galio-framework";
import Barcode from '../views/Barcode';
import Login from '../views/User/login/login'

// import ComponentsScreen from '../screens/Components';
// import HomeScreen from '../screens/Home';
// import OnboardingScreen from '../screens/Onboarding';
// import ProfileScreen from '../screens/Profile';
// import ProScreen from '../screens/Pro';
// import SettingsScreen from '../screens/Settings';

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

const LoginStack = createStackNavigator({
  Home: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Smart Checkout" navigation={navigation} />,
      headerTransparent: true,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
});

const BarcodeStack = createStackNavigator({
  Home: {
    screen: Barcode,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Scan your Barcode" navigation={navigation} />,
      headerTransparent: true,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
});

// const ProfileStack = createStackNavigator({
//   Profile: {
//     screen: ProfileScreen,
//     navigationOptions: ({ navigation }) => ({
//       header: <Header white transparent title="Profile" navigation={navigation} />,
//       headerTransparent: true,
//     })
//   },
// }, {
//   cardStyle: { backgroundColor: '#EEEEEE', },
//   transitionConfig,
// });

// const SettingsStack = createStackNavigator({
//   Settings: {
//     screen: SettingsScreen,
//     navigationOptions: ({ navigation }) => ({
//       header: <Header title="Settings" navigation={navigation} />,
//     })
//   },
// }, {
//   cardStyle: { backgroundColor: '#EEEEEE', },
//   transitionConfig,
// });

// const ComponentsStack = createStackNavigator({
//   Components: {
//     screen: ComponentsScreen,
//     navigationOptions: ({ navigation }) => ({
//       header: <Header title="Components" navigation={navigation} />,
//     })
//   },
// }, {
//   cardStyle: { backgroundColor: '#EEEEEE', },
//   transitionConfig,
// });

// const HomeStack = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//     navigationOptions: ({navigation}) => ({
//       header: <Header search tabs title="Home" navigation={navigation} />,
//     })
//   },
//   Pro: {
//     screen: ProScreen,
//     navigationOptions: ({navigation}) => ({
//       header: <Header back white transparent title="" navigation={navigation} />,
//       headerTransparent: true,
//     })
//   },
// },
// {
//   cardStyle: { 
//     backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
//   },
//   transitionConfig,
// });

const AppStack = createDrawerNavigator(
  {
    Home: {
      screen: LoginStack,
      navigationOptions: {
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        )
      }
    },
    Barcode: {
      screen: BarcodeStack,
      navigationOptions: {
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Barcode" title="Barcode" />
        )
      }
    },
    // Home: {
    //   screen: HomeStack,
    //   navigationOptions: {
    //     drawerLabel: ({focused}) => (
    //       <Drawer focused={focused} screen="Home" title="Home" />
    //     )
    //   }
    // },
    // Profile: {
    //   screen: ProfileStack,
    //   navigationOptions: (navOpt) => ({
    //     drawerLabel: ({focused}) => (
    //       <Drawer focused={focused} screen="Profile" title="Profile" />
    //     ),
    //   }),
    // },
    // Settings: {
    //   screen: SettingsStack,
    //   navigationOptions: (navOpt) => ({
    //     drawerLabel: ({focused}) => (
    //       <Drawer focused={focused} screen="Settings" title="Settings" />
    //     ),
    //   }),
    // },
    // Components: {
    //   screen: ComponentsStack,
    //   navigationOptions: (navOpt) => ({
    //     drawerLabel: ({focused}) => (
    //       <Drawer focused={focused} screen="Components" title="Components" />
    //     ),
    //   }),
    // },
    // MenuDivider: {
    //   screen: HomeStack,
    //   navigationOptions: {
    //     drawerLabel: () => <Block style={{marginVertical: 8}}><Text>{` `}</Text></Block>,
    //   },
    // },
  
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
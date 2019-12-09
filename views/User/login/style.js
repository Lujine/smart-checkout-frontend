import {
  StyleSheet,
  Dimensions
} from 'react-native';
import { theme } from 'galio-framework';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

export default StyleSheet.create({

containerView: {
  flex: 1,
},
loginScreenContainer: {
  flex: 1,
},
logoText: {
  fontSize: 40,
  fontWeight: "800",
  marginTop: 150,
  marginBottom: 30,
  textAlign: 'center',
},
loginFormView: {
  flex: 1
},
loginFormTextInput: {
  height: 43,
  fontSize: 14,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: '#fafafa',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 5,
  marginBottom: 5,

},
loginButton: {
  backgroundColor: '#3897f1',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
},
registerButton: {
  backgroundColor: 'green',
  borderRadius: 5,
  height: 45,
  marginTop: 10,
},
fbLoginButton: {
  height: 45,
  marginTop: 10,
  backgroundColor: 'transparent',
},
title: {
  paddingVertical: theme.SIZES.BASE,
  paddingHorizontal: theme.SIZES.BASE * 2,
},
group: {
  paddingTop: theme.SIZES.BASE * 3.75,
},
shadow: {
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  shadowOpacity: 0.2,
  elevation: 2,
},
button: {
  marginBottom: theme.SIZES.BASE,
  width: width - (theme.SIZES.BASE * 2),
},
});

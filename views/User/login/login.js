import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Keyboard,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { materialTheme } from '../../../constants';
import { Select, Icon, Header, Product, Switch } from '../../../components/';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;


import styles from "./style";
// import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
// import { Button } from 'react-native-elements';
import Axios from 'axios';

export default class LoginScreen extends Component {

  state = {
    email: null,
    password: null,
    error: null,
  };

  static navigationOptions = {
    title: "LogIn",
  };

  componentDidMount() {
  }

  renderInputs = (info) => {
    return (
      <Block flex style={styles.group}>
        {/* <Text bold size={16} style={styles.title}>Log in</Text> */}
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          {
            info.map((inputInfo, index) => (
              <Input
                right
                placeholder={inputInfo.placeholder}
                key={index}
                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                iconContent={<Icon size={16} color={theme.COLORS.ICON} name={inputInfo.icon} family="GalioExtra" />}
                onChange={inputInfo.onChange}
                secureTextEntry={inputInfo.secureTextEntry || false}
              />
            ))
          }
        </Block>
      </Block>
    )
  }

  emailOnChange = (e) => this.OnLoginInput(e, "email");
  passwordOnChange = (e) => this.OnLoginInput(e, "pass");

  render() {
    return (
      <Block flex center>

        <KeyboardAvoidingView style={styles.containerView} behavior="padding">

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.components}
              showsVerticalScrollIndicator={false}>
                <Text bold size={16} style={styles.logoText}>Log In</Text>

                {
                  this.renderInputs(
                    [
                      { placeholder: "email", icon: 'camera-18', onChange: this.emailOnChange },
                      { placeholder: "password", icon: 'camera-18', onChange: this.passwordOnChange, secureTextEntry:true },
                    ]
                  )
                }

                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                  <Block center>
                    <Button
                      shadowless
                      color={materialTheme.COLORS.PRIMARY}
                      style={[styles.button, styles.shadow]}
                      onPress={() => this.onLoginPress()}
                      title="Login"
                    >
                      Login
                    </Button>
                    <Button
                      shadowless
                      color={materialTheme.COLORS.PRIMARY}
                      style={[styles.button, styles.shadow]}
                      onPress={() => this.props.navigation.navigate('Register')}
                      title="Register"
                    >
                      Register
                    </ Button>
                  </Block>
                </Block>

            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Block>
    );
  }
  OnLoginInput = (e, type) => {
    if (type === "pass") {
      this.setState({
        password: e.nativeEvent.text
      })
    }
    else {
      this.setState({
        email: e.nativeEvent.text
      })
    }
  }
  async onLoginPress () {
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    console.log('logging in please wait!')
    try
    {
      const res = await Axios.post('https://smartcheckoutbackend.herokuapp.com/api/user/login', data)
      await AsyncStorage.setItem('user', JSON.stringify(res.data.data));
      await AsyncStorage.setItem('token', res.data.token);
      console.log('Gonna navigate yaay')
      this.props.navigation.navigate('Drawer');
   
    }
    catch(error)
    {
      const err = error.response.data.message || error.response.data.msg
      console.log(err);
      this.setState({ error: err });
      alert(this.state.error)
    }
  
  }

}

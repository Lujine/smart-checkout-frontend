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
  Alert
} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { materialTheme } from '../../../constants';
import { Select, Icon, Header, Product, Switch } from '../../../components/';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

import styles from "./style";
import Axios from 'axios';

export default class RegisterScreen extends Component {

  state = {
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    birthdate: null,
    age: null,
    error: null,
    navigate: null
  };

  firstNameOnChange = (e) => this.OnInput(e, "first")
  lastNameOnChange = (e) => this.OnInput(e, "last");
  emailOnChange = (e) => this.OnInput(e, "email");
  ageOnChange = (e) => this.OnInput(e, "age");
  dateOnChange = (e) => this.OnInput(e, "date");
  passOnChange = (e) => this.OnInput(e, "pass");

  static navigationOptions = {
    title: "Register",
  };

  componentDidMount() {
    const { navigate } = this.props.navigation;
    this.setState({ navigate });
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

  render() {
    return (
      <Block flex center>

        <ScrollView style={styles.components}
          showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView style={styles.containerView} behavior="padding">

            <Text style={styles.logoText}>Register</Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.loginFormView}>

                {
                  this.renderInputs(
                    [
                      { placeholder: "firstName", onChange: this.firstNameOnChange },
                      { placeholder: "lastName", onChange: this.lastNameOnChange },
                      { placeholder: "email", onChange: this.emailOnChange },
                      { placeholder: "age", onChange: this.ageOnChange },
                      { placeholder: "birthdate", onChange: this.dateOnChange },
                      { placeholder: "password", onChange: this.passOnChange, secureTextEntry:true },
                    ]
                  )
                }
                {/*
              <TextInput 
              placeholder="Password" placeholderColor="#c4c3cb" 
              style={styles.loginFormTextInput} secureTextEntry={true}
              onChange={(e)=>this.OnInput(e,"pass")}
              /> 
              */}
                <Button
                  shadowless
                  color={materialTheme.COLORS.PRIMARY}
                  style={[styles.button, styles.shadow]}
                  buttonStyle={styles.loginButton}
                  onPress={() => this.onPress()}
                  title="Submit"
                >
                  Submit
              </Button>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
      </Block>
    );
  }
  OnInput = (e, type) => {
    if (type === "pass") {
      this.setState({
        password: e.nativeEvent.text
      })
    }
    else if (type === "first") {
      this.setState({
        firstName: e.nativeEvent.text
      })
    }
    else if (type === "last") {
      this.setState({
        lastName: e.nativeEvent.text
      })
    }
    else if (type === "email") {
      this.setState({
        email: e.nativeEvent.text
      })
    }
    else if (type === "age") {
      this.setState({
        age: e.nativeEvent.text
      })
    }
    else if (type === "date") {
      this.setState({
        birthdate: e.nativeEvent.text
      })
    }
  }
  onPress() {
    const data = {
      email: this.state.email,
      name: {
        first: this.state.firstName,
        last: this.state.lastName
      },
      password: this.state.password,
      birthdate: this.state.birthdate,
      age: this.state.age,
      shoppingCart: {
        store: "5ddfeb1d1d3bee4c4c05bd09",
        itemsSelected: [],
        totalPrice: 0
      },
      isAdmin: false
    }
    Axios.post('https://smartcheckoutbackend.herokuapp.com/api/user/register', data)
      .then(res => {
        this.state.navigate('Profile', {
          user: res.data.data,
          token: res.data.token
        });
      })
      .catch(error => {
        const err = error.response.data.message || error.response.data.msg
        console.log(err);
        this.setState({ error: err });
        alert(this.state.error)
      });
  }

}

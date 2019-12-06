import React, { Component } from "react";
import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import Axios from 'axios';

export default class LoginScreen extends Component {

  state={
    email:null,
    password:null,
    error:null,
    navigate:null
  };
  componentDidMount()
  {
    const {navigate}=this.props.navigation;
    this.setState({navigate});
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>SmartCheckout</Text>
            <TextInput
             placeholder="email" placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChange={(e)=>this.OnLoginInput(e,"email")} 
              />
            <TextInput 
            placeholder="Password" placeholderColor="#c4c3cb" 
            style={styles.loginFormTextInput} secureTextEntry={true}
            onChange={(e)=>this.OnLoginInput(e,"pass")}
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onLoginPress()}
              title="Login"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  OnLoginInput = (e,type)=>{
    if(type==="pass")
    {
      this.setState({
        password:e.nativeEvent.text
      })
    }
    else
    {
      this.setState({
        email:e.nativeEvent.text
      })
    }
  }
  onLoginPress() {
    // Axios.post('http://localhost:8080/api/user/login')
    // .then(res=>{
    //   console.log(res)
    // })
    // .catch(error=>{console.log(error)});
    console.log("logging in");
    if(this.state.email && this.state.password && !this.state.error)
      this.state.navigate('Barcode');
    else
    {
      alert("please log in correctly")
    }
  }

}

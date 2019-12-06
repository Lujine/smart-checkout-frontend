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
  static navigationOptions = {
    title: "LogIn",
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
            <Button
              buttonStyle={styles.registerButton}
              onPress={() =>  this.state.navigate('Register')}
              title="Register"
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
    const data = {
        email:this.state.email,
        password:this.state.password
      }
    Axios.post('https://smartcheckoutbackend.herokuapp.com/api/user/login',data)
    .then(res=>{
      console.log(res.data.token);
      this.state.navigate('HomeScreen',{
        user:res.data.data,
        token:res.data.token
      });
    })
    .catch(error=>{
        const err= error.response.data.message||error.response.data.msg
        console.log(err);
        this.setState({error:err});
        alert(this.state.error)
      });
  }

}

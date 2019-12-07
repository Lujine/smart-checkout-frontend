import React, { Component } from "react";
import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import Axios from 'axios';

export default class LoginScreen extends Component {

  state={
    email:null,
    firstName:null,
    lastName:null,
    password:null,
    birthdate:null,
    age:null,
    error:null,
    navigate:null
  };
  static navigationOptions = {
    title: "Register",
  };

  componentDidMount()
  {
    const {navigate}=this.props.navigation;
    this.setState({navigate});
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <Text style={styles.logoText}>SmartCheckout</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <TextInput
             placeholder="firstName" placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChange={(e)=>this.OnInput(e,"first")} 
            />
            <TextInput
             placeholder="lastName" placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChange={(e)=>this.OnInput(e,"last")} 
            />
            <TextInput
            placeholder="email" placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
            onChange={(e)=>this.OnInput(e,"email")} 
            />
            <TextInput
             placeholder="age" placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChange={(e)=>this.OnInput(e,"age")} 
              />
            <TextInput
            placeholder="birthdate" placeholderColor="#c4c3cb"
            style={styles.loginFormTextInput}
            onChange={(e)=>this.OnInput(e,"date")} 
           />
            <TextInput 
            placeholder="Password" placeholderColor="#c4c3cb" 
            style={styles.loginFormTextInput} secureTextEntry={true}
            onChange={(e)=>this.OnInput(e,"pass")}
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.onPress()}
              title="Submit"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
  OnInput = (e,type)=>{
    if(type==="pass")
    {
      this.setState({
        password:e.nativeEvent.text
      })
    }
    else if(type==="first")
    {
      this.setState({
        firstName:e.nativeEvent.text
      })
    }
    else if(type==="last")
    {
      this.setState({
        lastName:e.nativeEvent.text
      })
    }
    else if(type==="email")
    {
      this.setState({
        email:e.nativeEvent.text
      })
    }
    else if(type==="age")
    {
      this.setState({
        age:e.nativeEvent.text
      })
    }
    else if(type==="date")
    {
      this.setState({
        birthdate:e.nativeEvent.text
      })
    }
  }
  onPress() {
    const data = {
      email:this.state.email,
      name:{
        first:this.state.firstName,
        last:this.state.lastName
      },
      password:this.state.password,
      birthdate:this.state.birthdate,
      age:this.state.age,
      shoppingCart:{
        store:"5ddfeb1d1d3bee4c4c05bd09",
        itemsSelected:[],
        totalPrice:0
      },
      isAdmin:false
    }
    Axios.post('https://smartcheckoutbackend.herokuapp.com/api/user/register',data)
    .then(res=>{
      this.state.navigate('Profile',{
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

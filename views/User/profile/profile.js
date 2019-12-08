import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { Card } from "galio-framework";
import { ListItem } from "react-native-elements";
import Axios from "axios";

export default class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `  My Profile`,
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
        </TouchableOpacity>
      );
    },
    headerRight: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
        <Button title="logout" onPress={()=>navigation.navigate("Home")} />
        </TouchableOpacity>
      );
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      navigate:null,
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          Hello {this.props.navigation.state.params.user.name.first} {this.props.navigation.state.params.user.name.last}
        </Text>
        <Text style={styles.title}>
          My Cart
        </Text>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>
            Items
          </Text>
  
          <Card containerStyle={{padding: 0}} >
          {
              this.props.navigation.state.params.user.shoppingCart.itemsSelected.map((item, i) => {
              return (
                  <ListItem
                  key={i}
                  title={item.name}
                  onPress={()=>{

                  }}
                  />
              );
              })
          }
          <Text>
            total price {this.props.navigation.state.params.user.shoppingCart.totalPrice}
          </Text>
          <Button
          title="Refresh total price"
          onPress={()=>{
            //toDo call route calculate total price
          }}
          />
          <Button
          title="delete cart"
          onPress={()=>{
            Axios.delete(`https://smartcheckoutbackend.herokuapp.com/api/user/${this.props.navigation.state.params.user._id}/cart`)
            .then(res=>{
              console.log(res.data.data)
              alert("deleted Cart Succesfully")
            })
            .catch(error=>{
              console.log(error)
              const err= error.response.data.message||error.response.data.msg
              console.log(err);
              this.setState({error:err});
              alert(this.state.error)
            })

          }}
          />
          
          </Card>
        </ScrollView> 
        <Button title="Stores" onPress={()=>this.props.navigation.navigate("Stores",{user:this.props.navigation.state.params.user})} />
       
      </ScrollView>
        );
  }


}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  title: {
    fontWeight: "bold",
    color: "black",
    fontSize: 25
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5
  }
});


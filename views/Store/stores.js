import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
} from "react-native";
import {
    Card,
    ListItem,
} from 'react-native-elements'
import Axios from "axios";

export default class Stores extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `  Stores`,
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
        <Button title="go back" onPress={()=>navigation.navigate("Profile")} />
        </TouchableOpacity>
      );
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      navigate:null,
      stores:[],
      storeId:"",
      chosen:false,
      store:null,

    };
  }

  componentDidMount() {
      Axios.get('https://smartcheckoutbackend.herokuapp.com/api/store')
      .then(res=>{
            this.setState({stores:res.data.data})
      })
      .catch(error=>{
        const err= error.response.data.message||error.response.data.msg
        console.log(err);
        this.setState({error:err});
        alert(this.state.error)
      })
  }

   allStores=()=>{
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>
            Stores
          </Text>
  
          <Card containerStyle={{padding: 0}} >
          {
              this.state.stores.map((store, i) => {
              return (
                  <ListItem
                  key={i}
                  roundAvatar
                  title={store.name}
                  onPress={()=>{
                      Axios.get(`https://smartcheckoutbackend.herokuapp.com/api/store/${store._id}`)
                      .then(res=>{
                            this.setState({store:res.data.data})
                            this.setState({chosen:true})
                      })
                      .catch(error=>{
                        const err= error.response.data.message||error.response.data.msg
                        console.log(err);
                        this.setState({error:err});
                        alert(this.state.error)
                      })
                    }}
                  />
              );
              })
          }
          </Card>
        </ScrollView>
          );
  }

  getStore=()=>{
    return (
        <ScrollView style={styles.container}>
             <Card containerStyle={{padding: 0}} >
                <View>
                    <Text>Name: {this.state.store.name}</Text>
                    <Text>Address: {this.state.store.address}</Text>
                    <Text>Phone Number: {this.state.store.phoneNumber}</Text>
                    <Button title="Start Shopping" 
                    onPress={()=>{
                        //toDo check if we need to prompt the user for deletion of cart

                        this.props.navigation.navigate("Barcode",{
                        user:this.props.navigation.state.params.user,
                        storeId:this.state.storeId
                    })}
                }
                    />
                </View>
            </Card>
        </ScrollView>
        );
}

  render() {
      const rendered=!this.state.chosen?(this.allStores()):(this.getStore());
    
    return rendered;
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


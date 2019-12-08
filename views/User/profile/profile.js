import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  AsyncStorage,
  View,
} from "react-native";
import { Card } from "galio-framework";
import Axios from "axios";
import Modal, { ModalContent, SlideAnimation } from 'react-native-modals';


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
          <Button title="logout" onPress={() => navigation.navigate("Home")} />
        </TouchableOpacity>
      );
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      navigate: null,
      user: {},
      loaded: false,
      modalText:"",
      modalVis:false,
    };
  }

  async componentDidMount() {
    console.log('here')
    const stringUser = await AsyncStorage.getItem('user')
    const parsed = JSON.parse(stringUser)
    const user = parsed
    this.setState({ user: user, loaded: true })
  }

  render() {
    const { user, loaded } = this.state
    console.log(`User2: ${user}`)
    if (loaded) {
      return (
        <ScrollView style={styles.container}>
          <Modal
            visible={this.state.modalVis}
            modalAnimation={new SlideAnimation({
              slideFrom: 'top',
            })}
            onTouchOutside={() => {
              this.setState({ visible: false });
            }}
          >
            <ModalContent>
              <Text>{this.state.modalText}</Text>
              
              <Button title={"Proceed"}
                onPress={() => {
                  Axios.delete(`https://smartcheckoutbackend.herokuapp.com/api/user/${user._id}/cart`)
                  .then(res => {
                    console.log(res.data.data)
                  })
                  .catch(error => {
                    console.log(error)
                    const err = error.response.data.message || error.response.data.msg
                    console.log(err);
                    this.setState({ error: err });
                    alert(this.state.error)
                  })
                }
                }
              />
              <Button title="Cancel"
                buttonStyle={styles.cancelButton}
                onPress={() => {
                  this.setState({ modalVis: false })
                }
                }
              />
            </ModalContent>
          </Modal>
          <Text style={styles.title}>
            Hello {user.name.first} {user.name.last}
          </Text>
          <Text style={styles.title}>
            My Cart
        </Text>
          <ScrollView style={styles.container}>
            <Text>
              Items
          </Text>

            <Card containerStyle={{ padding: 0 }} >
              {
                user.shoppingCart.itemsSelected.map((item, i) => {
                  return (
                    <View>
                      <Text>{item.name}</Text>
                      <Button 
                      title="delete Item"
                      onPress={()=>{
                        Axios.delete(`https://smartcheckoutbackend.herokuapp.com/api/user/${user._id}/cart/item/${item._id}`)
                        .then(res=>{
                          console.log(res.data.data)
                          alert('deleted item succesfuly')
                        })
                        .catch(error=>{
                          console.log(error)
                          const err = error.response.data.message || error.response.data.msg
                          console.log(err);
                          this.setState({ error: err });
                          alert(this.state.error)
                        })
                      }}
                      />
                    </View>
                  );
                })
              }
              <Text>
                total price {user.shoppingCart.totalPrice}
              </Text>
              <Button
                title="Refresh total price"
                onPress={() => {
                  //toDo call route calculate total price
                }}
              />
               <Button
                title="checkout cart"
                onPress={() => {
                  this.setState({
                    modalText:"are you sure you're done shopping? it's going to charge you then delete your cart",
                    modalVis:true
                  })
                }}
              />
              <Button
                title="delete cart"
                onPress={() => {
                  this.setState({
                    modalText:"are you sure you want to delete your cart?",
                    modalVis:true
                  })
                }}
              />

            </Card>
          </ScrollView>
          <Button title="Stores" onPress={() => this.props.navigation.navigate("Store")} />

        </ScrollView>
      );
    }
    return (
      <View>
      <Text style={styles.title}> Loading please wait </Text>
      </View>
    )
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

import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  View,
} from "react-native";
import { Card, Block, Button, Text, Input, theme } from "galio-framework";
import Axios from "axios";
import Modal, { ModalContent, SlideAnimation } from 'react-native-modals';
import materialTheme from '../../../constants/Theme'

export default class Profile extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: `  My Profile`,
  //   headerLeft: () => {
  //     return (
  //       <TouchableOpacity
  //         onPress={() => {
  //           navigation.openDrawer();
  //         }}
  //       >
  //       </TouchableOpacity>
  //     );
  //   },
  //   headerRight: () => {
  //     return (
  //       <TouchableOpacity
  //         onPress={() => {
  //           navigation.openDrawer();
  //         }}
  //       >
  //         <Button title="logout" onPress={() => navigation.navigate("Home")} />
  //       </TouchableOpacity>
  //     );
  //   }
  // });

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      navigate: null,
      user: {},
      loaded: false,
      modalText: "",
      modalVis: false,
    };
  }

  async componentDidMount() {
    console.log('here')
    const stringUser = await AsyncStorage.getItem('user')
    const user = JSON.parse(stringUser)
    console.log(`User ${user}`)
    this.setState({ user: user, loaded: true })
  }

  render() {
    const { user, loaded } = this.state
    console.log(`User2: ${user}`)
    if (loaded) {
      return (
        <Block flex center>

          <ScrollView showsVerticalScrollIndicator={false}>
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

                <Button
                  color={materialTheme.COLORS.SUCCESS}
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
                >
                  Proceed
                  </Button>
                <Button
                   color={materialTheme.COLORS.WARNING}
                  onPress={() => this.setState({ modalVis: false })}
                >
                  Cancel
                </Button>
              </ModalContent>
            </Modal>

            <Block center>
              <Text
                center
                bold
                size={30}
                style={{ marginTop: '10%', marginBottom: '10%' }}
              >
                Hello {user.name.first} {user.name.last}
              </Text>
            </Block>

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

                          onPress={() => {
                            Axios.delete(`https://smartcheckoutbackend.herokuapp.com/api/user/${user._id}/cart/item/${item._id}`)
                              .then(res => {
                                console.log(res.data.data)
                                alert('deleted item succesfuly')
                              })
                              .catch(error => {
                                console.log(error)
                                const err = error.response.data.message || error.response.data.msg
                                console.log(err);
                                this.setState({ error: err });
                                alert(this.state.error)
                              })
                          }}
                        >
                          delete Item
                        </Button>
                      </View>
                    );
                  })
                }
                <Text>
                  total price {user.shoppingCart.totalPrice}
                </Text>
                <Button

                  onPress={() => {
                    //toDo call route calculate total price
                  }}
                >
                  Refresh total pric
              </Button>
                <Button

                  onPress={() => {
                    this.setState({
                      modalText: "are you sure you're done shopping? it's going to charge you then delete your cart",
                      modalVis: true
                    })
                  }}
                >
                  checkout cart
                </Button>
                <Button

                  onPress={() => {
                    this.setState({
                      modalText: "are you sure you want to delete your cart?",
                      modalVis: true
                    })
                  }}
                >
                  delete cart
                </Button>

              </Card>
            </ScrollView>
            <Button onPress={() => this.props.navigation.navigate("Store")} >
                  Browse Stores
            </Button>

          </ScrollView>
        </Block>
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

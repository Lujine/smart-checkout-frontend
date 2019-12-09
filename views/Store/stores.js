import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage,
} from "react-native";
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { materialTheme } from '../../constants';
import { Card, ListItem } from 'react-native-elements'
import Axios from "axios";
import Modal, { ModalContent, SlideAnimation } from 'react-native-modals';

export default class Stores extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: `  Stores`,
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
  //       <Button title="go back" onPress={()=>navigation.navigate("Profile")} />
  //       </TouchableOpacity>
  //     );
  //   }
  // });

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      navigate: null,
      stores: [],
      storeId: "",
      chosen: false,
      store: {},
      user: {},
      modalVis: false,
      modalText: "",

    };
  }

  componentDidMount() {
    Axios.get('https://smartcheckoutbackend.herokuapp.com/api/store')
      .then(res => {
        this.setState({ stores: res.data.data })
      })
      .catch(error => {
        const err = error.response.data.message || error.response.data.msg
        console.log(err);
        this.setState({ error: err });
        alert(this.state.error)
      })
    AsyncStorage.getItem('user')
      .then(stringUser => {
        const user = JSON.parse(stringUser)
        this.setState({ user })
      })
  }

  allStores = () => {
    return (
      <ScrollView style={styles.container}>
        <Block center>
          <Text
            center
            bold
            size={30}
            style={{ marginTop: '10%' }}
          >
            Stores
          </Text>
        </Block>

        <Card containerStyle={{ padding: 0 }} >
          {
            this.state.stores.map((store, i) => {
              return (
                <ListItem
                  key={i}
                  roundAvatar
                  title={store.name}
                  onPress={() => {
                    Axios.get(`https://smartcheckoutbackend.herokuapp.com/api/store/${store._id}`)
                      .then(res => {
                        this.setState({ store: res.data.data })
                        this.setState({ chosen: true })
                      })
                      .catch(error => {
                        const err = error.response.data.message || error.response.data.msg
                        console.log(err);
                        this.setState({ error: err });
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

  getStore = () => {
    const { user } = this.state;
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

            <Button
              shadowless
              color={materialTheme.COLORS.SUCCESS}
              onPress={() => {
                Axios.delete(`https://smartcheckoutbackend.herokuapp.com/api/user/${user._id}/cart`)
                  .then(res => {
                    console.log(res)
                    alert('deleted your cart succesfuly loading store now')
                    AsyncStorage.setItem('storeId', this.state.store._id)
                      .then(_ => {
                        this.setState({ modalVis: false})
                        this.setState({chosen:false,storeId:""})
                        this.props.navigation.navigate("Barcode")
                      })
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
              shadowless
              color={materialTheme.COLORS.WARNING}
              onPress={() => this.setState({ modalVis: false })}
            >
              Cancel
            </Button>
          </ModalContent>
        </Modal>
        <Block flex center style={{ marginTop:'20%' }}>
          <Text
             center 
             bold
             size={30}
          >
            Your selected Store
          </Text>
          <Card containerStyle={{ padding: 0 }} >
            <Text size={20}>Name: {this.state.store.name}</Text>
            <Text size={20}>Address: {this.state.store.address}</Text>
            <Text size={20}>Phone Number: {this.state.store.phoneNumber}</Text>
            <Button
              onPress={async () => {
                if (user.shoppingCart.store === this.state.store._id) {
                  console.log('navigating to barcode ', this.state.store._id);
                  await AsyncStorage.setItem('storeId', this.state.store._id);
                  this.props.navigation.navigate("Barcode")
                }
                else {
                  this.setState({
                    modalText: "the store you're going to shop from is different than your current cart, doing this will delete your cart",
                    modalVis: true
                  })
                }
              }} >
              Start Shopping
  
            </ Button>
          </Card>
        </Block>
      </ScrollView>
    );
  }

  render() {
    <Block flex center>
      {
        rendered = !this.state.chosen
          ?
          this.allStores()
          :
          this.getStore()
      }
    </Block>

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


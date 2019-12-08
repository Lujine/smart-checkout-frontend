import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import {
  Card,
} from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Axios from 'axios';
import styles from "./style";

export default class Barcode extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    user:null,
    token:null,
    storeId:"",
    item:null
  };
  static navigationOptions = {
    title: "CashMeOutside",
  };

  async componentDidMount() {
    this.getPermissionsAsync();
    this.setState({
      user:this.props.navigation.state.params.user,
      token:this.props.navigation.state.params.token,
      storeId:this.props.navigation.state.params.storeId
    });
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        
        <Text>Scan the barcode of the item you want!</Text>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned &&  (
          <ScrollView>
             <Card containerStyle={{padding: 0}} >
                <View>
                    <Text>Name: {this.state.item.name}</Text>
                    <Text>Price: {this.state.item.price}</Text>
                    <Text>Discount : {this.state.item.discount}</Text>
                    <Button title="Add to Cart" 
                    onPress={()=>{

                  }
                }
                    />
                    <Button title="Cancel"
                    buttonStyle={styles.cancelButton}
                    onPress={()=>{

                  }
                }
                    />
                </View>
            </Card>
            </ScrollView>
       )
        }

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    Axios.get(`https://smartcheckoutbackend.herokuapp.com/api/store/${this.props.navigation.state.params.storeId}/items/${data}`)
    .then(res=>{
      this.setState({
        item:res.data.data
      })
      this.setState({ scanned: true });
      
      console.log(this.state.item.name)
    })
    .catch(error=>{
      const err= error.response.data.message||error.response.data.msg
      console.log(err);
      this.setState({error:err});
      //alert(this.state.error)
    })
   
  };
}
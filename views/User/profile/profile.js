import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  AsyncStorage,
} from "react-native";

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
      user: {},
      loaded: false
    };
  }

  async componentDidMount() {
    console.log('here')
    const stringUser = await AsyncStorage.getItem('user')
    const parsed = JSON.parse(stringUser)
    const user = parsed
    this.setState({user: user, loaded: true})
  }

  render() {
    const { user, loaded } = this.state
    console.log(`User2: ${user}`)
    if(loaded) {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>
            Hello
             {user.name.first} {user.name.last}
          </Text>
          <Button title="Stores" onPress={()=>this.props.navigation.navigate("Stores")} />          
        </ScrollView>
          );
    }
    return (
      <Text> Loading </Text>
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


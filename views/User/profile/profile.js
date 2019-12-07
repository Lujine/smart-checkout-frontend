import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
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


import React, { Component } from "react";
import { Button, Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
// import SignInAndUpForm from "../../components/SignInAndUpForm";
import SignInForm from "../../components/SignInForm";
import grasshopper from '../../assets/images/Small.jpg';


export default class SignInScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.grasshopperImageContainer}>
          <Image source={grasshopper} style={styles.grasshopperImage} />
        </View>
        <SignInForm navigation={this.props.navigation} />
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text style={styles.signUpText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffdf3"
  },
  optionsContainer: {
    flexDirection: "row"
  },
  signUpText: {
    fontWeight: "600",
    fontSize: 15,
    opacity: 0.5

  },
  optionsText: {
    fontSize: 15,
    opacity: 0.4
  },
  grasshopperImage: {
    width: 100,
    height: 100,
    opacity: 0.8,
  },
  grasshopperImageContainer: {
    width: '100%',
    alignItems: "center",
    padding: 25
  }
});

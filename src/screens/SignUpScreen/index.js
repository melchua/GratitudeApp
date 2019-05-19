import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import SignUpForm from "../../components/SignUpForm";
import { inject, observer } from "mobx-react";
import grasshopper from '../../assets/images/Small.jpg';


class SignUpScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.grasshopperImageContainer}>
          <Image source={grasshopper} style={styles.grasshopperImage} />
        </View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>GRATEFUL GRASSHOPPER</Text>
        </View>
        <View style={styles.titleLineBreak} />
        <SignUpForm navigation={this.props.navigation} />
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignIn")}
          >
            <Text style={styles.signInText}>Sign-In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default inject("authStore")(observer(SignUpScreen));

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
  signInText: {
    fontWeight: "600",
    fontSize: 15,
    opacity: 0.5
  },
  optionsText: {
    fontSize: 15,
    opacity: 0.4
  },
  titleContainer: {
    alignItems: 'center',
    fontFamily: 'helvetica'
  },
  title: {
    fontSize: 16,
    letterSpacing: 4,
    fontWeight: '600'
  },
  titleLineBreak: {
    marginTop: 20,
    marginBottom: 40,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '90%'
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
  },
});

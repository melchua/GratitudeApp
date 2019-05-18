import React, { Component } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { inject, observer } from "mobx-react";

class CreateTodoScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.homescreenContainer}>
        <View style={styles.navbarContainer}>
          <Text style={styles.cancelNavbarText}>Cancel</Text>
        </View>
        <View style={styles.todoContainer}>
          <Text>Todo Input fields</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default inject("todoStore")(observer(CreateTodoScreen));

const styles = StyleSheet.create({
  homescreenContainer: {
    flex: 1,
    // justifyContent: "start",
    // alignItems: "center"
    marginLeft: 10
  },
  navbarContainer: {
    flex: 1,
    justifyContent: "center"
  },
  cancelNavbarText: {
    color: "#b176ed",
    fontSize: 18,
    fontWeight: "600"
  },
  todoContainer: {
    flex: 12
  },
  inputContainer: {
    paddingTop: 15
  },
  inputLabel: {
    color: "white",
    fontSize: 16
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "transparent",
    padding: 15,
    margin: 5
  },
  logoutButtonText: {
    color: "#000000",
    fontSize: 70,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "700"
  }
});

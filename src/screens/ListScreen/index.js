import React, { Component } from "react";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { inject, observer } from "mobx-react";

class ListScreen extends Component {
  async componentDidMount() {
    await this.props.authStore.setCurrentUserId();
    this.populateGratitudes();
  }

  componentDidUpdate() {
    const { isGratitudesLoading } = this.props.gratitudeStore;

    if (isGratitudesLoading === false) {
      this.populateGratitudes();
    }
  }

  handleLogout = () => {
    this.props.authStore.signOut();
    this.props.navigation.navigate("SignIn");
  };

  populateGratitudes = () => {
    const { authStore } = this.props;
    const { gratitudeStore } = this.props;
    gratitudeStore.loadGratitudes(authStore.currentAuthUserId);
  };

  render() {
    // this.handleLogout();
    const { gratitudes } = this.props.gratitudeStore;
    const { navigation } = this.props;
    const gratitudeList = gratitudes.map((data, index) => (
      <View style={styles.gratitudeContainer} key={index}>
        <View style={styles.titleLineBreak} />
        <View>
          <Text style={styles.gratitudeDate}>{data.createdOn}</Text>
        </View>
        <View style={styles.gratitudeContainer}>
          <Text style={styles.gratitude}>{data.description}</Text>
        </View>
      </View>
    ));
    return (
      <View style={styles.layout}>
        <ScrollView>
          <View style={styles.homescreenContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>GRATITUDES</Text>
            </View>
            {gratitudeList}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateGratitude")}
          >
            <Text style={styles.addGratitude}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default inject("authStore", "gratitudeStore")(observer(ListScreen));

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: "#f7f4e9"
  },
  homescreenContainer: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#f7f4e9"
  },
  titleContainer: {
    width: width,
    alignItems: "center",
    fontFamily: "helvetica"
  },
  title: {
    fontSize: 20,
    letterSpacing: 4,
    fontWeight: "600"
  },
  gratitudeContainer: {
    alignItems: "center"
  },
  titleLineBreak: {
    marginTop: 30,
    marginBottom: 5,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "95%"
  },
  gratitudeDate: {
    color: "grey",
    fontFamily: "helvetica",
    letterSpacing: 1.5,
    opacity: 0.8
  },
  gratitudeContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "95%"
  },
  gratitude: {
    marginTop: 20,
    // width: 350,
    fontFamily: "times new roman",
    fontSize: 20,
    fontStyle: "italic",
    textAlign: "center",
    opacity: 0.9,
    backgroundColor: "#f7f4e9"
  },
  addGratitude: {
    fontSize: 60
  },
  footer: {
    // height: 50,
    bottom: 30,
    alignSelf: "center"
  }
});

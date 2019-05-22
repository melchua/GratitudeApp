import React, { Component } from 'react';
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  AppRegistry,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { mapQuestKey } from '../../../keys.js';

class CreateGratitudeScreen extends Component {
  state = {
    text: '',
    initialPosition: "unknown",
    lastPosition: 'unknown',
    latitude: '',
    longitude: '',
    timestamp: '',
    success: ''
  };

  componentDidMount = () => {
    // Get current position and stringify it
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude, timestamp } = position.coords;
        this.setState({
          latitude,
          longitude,
          timestamp
        });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    );

    // Watches current Position and updates if changes
    // navigator.geolocation.watchPosition(position => {
    //   const lastPosition = JSON.stringify(position);
    //   this.setState({ lastPosition });
    // });
  };

  handleLogout = () => {
    this.props.authStore.signOut();
    this.props.navigation.navigate('SignIn');
  };

  handleOpenList = () => {
    this.props.navigation.navigate('List');
  };

  handleCreateGratitude = () => {
    const { latitude, longitude, text } = this.state;
    const { addGratitude } = this.props.gratitudeStore;
    const { currentAuthUserId } = this.props.authStore;

    axios
      .get(
        `http://www.mapquestapi.com/geocoding/v1/reverse?key=${mapQuestKey}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`
      )
      .then(res =>
        this.setState({
          city: res.data.results[0].locations[0].adminArea5,
          street: res.data.results[0].locations[0].street
        })
      );

    addGratitude(currentAuthUserId, text).then(
      this.setState({ success: 'You have entered in your gratitude' })
    );
  };

  render() {
    const { latitude, longitude, city, street } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.layout}>
        <View style={styles.homescreenContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>NEW GRATITUDE</Text>
          </View>
          <View style={styles.gratitudeContainer}>
            <View style={styles.titleLineBreak} />
            <View>
              <Text style={styles.gratitudeDate}>
                {moment(new Date()).format('dddd, MMM Do')}
              </Text>
            </View>
            <View style={styles.submitContainer}>
              <Text style={styles.submit}>SUBMIT</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              placeholder='Today I am grateful for...'
              multiline={true}
            />
          </View>
          <TouchableOpacity
            style={styles.submitContainer}
            onPress={() => this.handleCreateGratitude()}
          >
            <Text style={styles.submit}>SUBMIT</Text>
          </TouchableOpacity>
          {/* <Text>{latitude}</Text>
          <Text>{longitude}</Text>
          <Text>{city}</Text>
          <Text>{street}</Text> */}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => this.handleLogout()}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>{this.state.success}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('List')}>
            <Text style={styles.addGratitude}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default inject('authStore', 'gratitudeStore')(
  observer(CreateGratitudeScreen)
);
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#f7f4e9'
  },
  homescreenContainer: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#f7f4e9'
  },
  titleContainer: {
    width: width,
    alignItems: 'center',
    fontFamily: 'helvetica'
  },
  title: {
    fontSize: 20,
    letterSpacing: 4,
    fontWeight: '600'
  },
  gratitudeContainer: {
    alignItems: 'center'
  },
  titleLineBreak: {
    marginTop: 30,
    marginBottom: 5,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '95%'
  },
  gratitudeDate: {
    color: 'grey',
    fontFamily: 'helvetica',
    letterSpacing: 1.5,
    opacity: 0.8
  },
  gratitudeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%'
  },
  describe: {
    marginTop: 20,
    fontFamily: 'times new roman',
    fontSize: 20,
    textAlign: 'center',
    opacity: 0.9,
    backgroundColor: '#f7f4e9'
  },
  input: {
    marginTop: 20,
    height: 200,
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    fontSize: 20,
    paddingLeft: 15,
    paddingTop: 15,
    fontStyle: 'italic',
    textAlign: 'justify'
  },
  addGratitude: {
    fontSize: 60
  },
  submitContainer: {
    width: width,
    alignItems: 'center',
    fontFamily: 'helvetica'
  },
  submit: {
    fontSize: 20,
    letterSpacing: 4,
    fontWeight: '600',
    marginTop: 30,
    opacity: 0.7
  },
  footer: {
    bottom: 30,
    alignSelf: 'center'
  }
});

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
  TouchableOpacity,
  MapView
} from 'react-native';
import moment from 'moment';
import Geocoder from 'react-native-geocoder';
import axios from 'axios';
import { mapQuestKey } from '../../../keys';

export default class ListScreen extends Component {
  state = {
    text: '',
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    latitude: '',
    longitude: '',
    timestamp: ''
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

  handleOpenList = () => {
    this.props.navigation.navigate('List');
  };

  handleCreateGratitude = () => {
    const { latitude, longitude } = this.state;
    console.warn('latlong', latitude, longitude);

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
  };

  render() {
    const { latitude, longitude, city, street } = this.state;

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
            <View style={styles.gratitudeContainer}>
              <Text style={styles.describe}>
                In 30 characters or less, describe what you are grateful for
                today.
              </Text>
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
          <Text>{latitude}</Text>
          <Text>{longitude}</Text>
          <Text>{city}</Text>
          <Text>{street}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => this.handleOpenList()}
          >
            <Text style={styles.addGratitude}>List</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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

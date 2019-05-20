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
  TouchableOpacity
} from 'react-native';
import Swipeout from 'react-native-swipeout';

// Swipeout Button
const swipeoutBtns = [
  {
    text: 'Delete',
    backgroundColor: 'red'
  }
];

const fakeData = [
  {
    date: 'Tuesday, November 30',
    gratitude: 'Going to the beach with friends.  Beautiful BC weather'
  },
  {
    date: 'Sunday, October 12',
    gratitude:
      'Coding in front of the water with awesome food.  Living close to the beach'
  },
  {
    date: 'Thursday, October 2',
    gratitude: 'Docking with my homies '
  },
  {
    date: 'Tuesday, November 20',
    gratitude: 'Going to the beach with friends.  Beautiful BC weather'
  },
  {
    date: 'Sunday, October 12',
    gratitude:
      'Coding in front of the water with awesome food.  Living close to the beach'
  },
  {
    date: 'Thursday, October 2',
    gratitude: 'Docking with my homies '
  },
  {
    date: 'Tuesday, November 20',
    gratitude: 'Going to the beach with friends.  Beautiful BC weather'
  },
  {
    date: 'Sunday, October 12',
    gratitude:
      'Coding in front of the water with awesome food.  Living close to the beach'
  },
  {
    date: 'Thursday, October 2',
    gratitude: 'Docking with my homies'
  }
];

export default class ListScreen extends Component {
  handleOpenCreateToDo = () => {
    this.props.navigation.navigate('CreateTodo');
  };
  render() {
    const { navigation } = this.props;
    const gratitudes = fakeData.map((data, index) => (
      <View style={styles.gratitudeContainer} key={index}>
        <View style={styles.titleLineBreak} />
        <View>
          <Text style={styles.gratitudeDate}>{data.date}</Text>
        </View>
        <Swipeout style={styles.swipeDelete} right={swipeoutBtns}>
          <View style={styles.gratitudeContainer}>
            <Text style={styles.gratitude}>{data.gratitude}</Text>
          </View>
        </Swipeout>
      </View>
    ));
    return (
      <View style={styles.layout}>
        <ScrollView>
          <View style={styles.homescreenContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>GRATITUDES</Text>
            </View>
            {gratitudes}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => this.handleOpenCreateToDo()}
          >
            <Text style={styles.addGratitude}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  swipeDelete: {
    width: '100%',
    backgroundColor: '#f7f4e9'
  },
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
  gratitude: {
    marginTop: 20,
    marginBottom: 30,
    fontFamily: 'times new roman',
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0.9,
    backgroundColor: '#f7f4e9'
  },
  addGratitude: {
    fontSize: 60
  },
  footer: {
    bottom: 30,
    alignSelf: 'center'
  }
});

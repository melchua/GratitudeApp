/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import awsmobile from "./aws-exports";
import Amplify from "aws-amplify";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import ConfirmScreen from "./src/screens/ConfirmScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AppHomeScreen from "./src/screens/AppHomeScreen";
import CreateGratitudeScreen from "./src/screens/CreateGratitudeScreen";

import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";

// Imports for store setup
import { Provider } from "mobx-react";
import RootStoreModel from "./src/stores/root-store";

Amplify.configure(awsmobile);

// configuring stacks
const MainStack = createStackNavigator(
  { AppHome: AppHomeScreen },
  { initialRouteName: "AppHome" }
); // switch to the app screen when we have one ready

const AppStack = createStackNavigator(
  {
    Main: MainStack,
    CreateGratitude: CreateGratitudeScreen
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const AuthStack = createStackNavigator(
  {
    Home: HomeScreen,
    SignUp: SignUpScreen,
    SignIn: SignInScreen,
    Confirm: ConfirmScreen
  },
  { initialRouteName: "SignIn" }
);

class App extends Component {
  state = {
    isLoading: false
  };
  async componentDidMount() {
    this.setState({ rootStore: await RootStoreModel.create({}) });
  }

  render() {
    const rootStore = this.state && this.state.rootStore;

    if (!rootStore) {
      return null;
    }
    // Prep stores for provider
    const stores = {
      rootStore: rootStore,
      authStore: rootStore.authStore,
      gratitudeStore: rootStore.gratitudeStore
    };

    return (
      <Provider {...stores}>
        <AppNavContainer />
      </Provider>
    );
  }
}

const AppNavContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default App;

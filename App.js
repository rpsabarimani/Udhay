import React, { Component } from "react";
import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { TouchableOpacity } from "react-native";
import SideMenu from "./app/SideMenu";
import DasboardScreen from "./app/Views/DasboardScreen";
import transactionScreen from "./app/Views/transactionScreen";
import LoginScreen from "./app/Views/LoginScreen";
import SplashScreen from "./app/Views/SplashScreen";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const stackNavigator = createStackNavigator(
  {
    DasboardScreen: {
      screen: DasboardScreen,
      navigationOptions: ({ navigation }) => ({
        title: `Dashboard`
      })
    },
    Unbilled: {
      screen: transactionScreen,
      params: { st: 0 },
      navigationOptions: ({ navigation }) => ({
        title: `Unbilled Transactions`
      })
    },
    Billed: {
      screen: transactionScreen,
      params: { st: 1 },
      navigationOptions: ({ navigation }) => ({
        title: `Billed Transactions`
      })
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#ffaf00"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="#fff" style={{ padding: 10 }} />
        </TouchableOpacity>
      )
    })
  }
);

const drawerScreens = createDrawerNavigator(
  {
    Dashboard: {
      screen: stackNavigator
    }
  },
  {
    contentComponent: SideMenu
  }
);

const StackScreen = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    drawerScreens: {
      screen: drawerScreens,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    initialRouteName: "SplashScreen",
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#ffaf00"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  }
);

const RootNavigation = createAppContainer(StackScreen);

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <RootNavigation />;
  }
}

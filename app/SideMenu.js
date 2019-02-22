import PropTypes from "prop-types";
import React, { Component } from "react";
// import styles from "./SideMenu.style";
import { NavigationActions } from "react-navigation";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  AsyncStorage,
  FlatList,
  Alert
} from "react-native";
var userImg = require("../assets/images/default-user.jpg");

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
    const val = this._retrieveData();
  }

  _retrieveData = async () => {
    const value = await AsyncStorage.getItem("username");
    if (value !== null) {
      this.setState({ username: value });
    }
  };

  logout = routeName => {
    AsyncStorage.multiRemove(["userid", "username"], err => {});
    this.props.navigation.navigate(routeName);
  };

  navigateToScreen = item => {
    this.props.navigation.closeDrawer();
    if (item.name == "Logout") {
      Alert.alert("", "Are you do want to logout?", [
        {
          text: "NO",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "YES",
          onPress: () => {
            this.logout(item.routeName);
          }
        }
      ]);
    } else this.props.navigation.navigate(item.routeName);
  };

  render() {
    const sideMenuData = [
      { routeName: "DasboardScreen", name: "DashBoard", params: {} },
      {
        routeName: "Unbilled",
        name: "Unbilled Transactions",
        params: { st: 2 }
      },
      { routeName: "Billed", name: "Billed Transactions", params: { st: 1 } },
      { routeName: "SplashScreen", name: "Logout", params: {} }
    ];

    return (
      <View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 180,
            backgroundColor: "#fcbf19"
          }}
        >
          <Image
            source={userImg}
            style={{ width: 100, height: 100, margin: 10, borderRadius: 100 }}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 21,
              color: "#fff",
              textAlign: "center"
            }}
          >
            Welcome, {this.state.username}!
          </Text>
        </View>
        <FlatList
          data={sideMenuData}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => this.navigateToScreen(item)}>
                <View style={styles.viewContainer}>
                  <Text style={styles.NavigationText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;

const styles = StyleSheet.create({
  viewContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef"
  },
  NavigationText: {
    fontSize: 16,
    color: "#666"
  }
});

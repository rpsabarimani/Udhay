import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TextInput,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import Snackbar from "./Snackbar";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pass: "", mobile: "", isLoading: false };
  }

  login = () => {
    if (!this.state.mobile) {
      this.refs.SnackBar.show({
        msg: "Please Enter Mobile Number",
        timeout: 10000,
        btnText: "Close"
      });
    } else if (!this.state.pass) {
      this.refs.SnackBar.show({
        msg: "Please enter password",
        timeout: 10000,
        btnText: "Close"
      });
    } else {
      this.setState({ isLoading: true });
      fetch(
        "https://yt.sabarimani.com/udhay.php?action=login&user=" +
          this.state.mobile +
          "&pass=" +
          this.state.pass
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ isLoading: false });
          let errCode = responseJson.error.errCode;
          let errMsg = responseJson.error.errMsg;
          if (errCode == 1) {
            // alert(errMsg);
            this.refs.SnackBar.show({
              msg: errMsg,
              timeout: 10000,
              btnText: "Close"
            });
          } else {
            this._storeData("userid", responseJson.results[0].id);
            this._storeData("username", responseJson.results[0].email);
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: "drawerScreens" })
              ]
            });
            this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate("Dashboard");
          }
          // console.log(responseJson);
        });
    }
  };

  _storeData = async (name, response) => {
    console.log(response);
    await AsyncStorage.setItem(name, response);
  };

  hideSnackBar() {
    this.refs.SnackBar.hide();
  }

  componentDidMount() {}

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ff8801",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {this.state.isLoading ? (
          <ActivityIndicator size={50} color="#fff" />
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 24, color: "#fff" }}>Welcome, User</Text>
            <TextInput
              style={Styles.input}
              onChangeText={text => this.setState({ mobile: text })}
              value={this.state.mobile}
              keyboardType={"phone-pad"}
              placeholder="Enter Mobile Number"
            />
            <TextInput
              style={Styles.input}
              onChangeText={text => this.setState({ pass: text })}
              value={this.state.pass}
              placeholder="Enter Password"
              secureTextEntry={true}
            />
            <TouchableOpacity
              onPress={() => {
                this.login();
              }}
              style={Styles.loginButton}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Snackbar
          ref="SnackBar"
          onPress={() => {
            this.hideSnackBar();
          }}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  input: {
    padding: 6,
    margin: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    backgroundColor: "#fff"
  },
  loginButton: {
    width: 100,
    backgroundColor: "#ff6600",
    padding: 10,
    marginTop: 10
  }
});

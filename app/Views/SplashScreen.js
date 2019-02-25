import React from "react";
import { View, ActivityIndicator, AsyncStorage } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _retrieveData = async () => {
    const value = await AsyncStorage.getItem("userid");
    if (value !== null && value != "") {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "drawerScreens" })]
      });
      this.props.navigation.dispatch(resetAction);

      this.props.navigation.navigate("DasboardScreen");
    } else {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Login" })]
      });
      this.props.navigation.dispatch(resetAction);
      this.props.navigation.navigate("Login");
    }
  };

  componentDidMount() {
    this._retrieveData();
  }

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
        <ActivityIndicator size={50100} color="#fff" />
      </View>
    );
  }
}

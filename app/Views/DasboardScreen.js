import React, { Component } from "react";
import {
  Text,
  PermissionsAndroid,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

export default class DasboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billed: 0,
      unbilled: 0,
      paidAmt: 0,
      lastUpdated: "-",
      isLoading: false,
      latitude: null,
      longitude: null,
      userId: ""
    };
    this.getLocation();
  }

  getLocation = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location",
        message: "This app would like to view your Location."
      }
    )
      .then(() => {
        console.log("wokeeey");
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log("wokeeey in");
            console.log(position);
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            fetch(
              "https://yt.sabarimani.com/udhay.php?action=updateLocation&userid=" +
                this.state.userId +
                "&lat=" +
                this.state.latitude +
                "&lng=" +
                this.state.longitude
            )
              .then(response => response.json())
              .then(responseJson => {});
          },
          error => alert(error.message),
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
      })
      .catch(e => {
        console.log(e);
      });
  };

  updateLocations = () => {};

  fetchData = async () => {
    this.setState({
      isLoading: true
    });
    const userId = await AsyncStorage.getItem("userid");
    this.setState({ userId: userId });

    fetch(
      "https://yt.sabarimani.com/udhay.php?action=getDashboard&userid=" +
        userId +
        "&lat=" +
        this.state.latitude +
        "&lng=" +
        this.state.longitude
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          unbilled: responseJson.results.unbilled,
          billed: responseJson.results.billed,
          paidAmt: responseJson.results.paidAmt,
          lastUpdated: responseJson.results.lastUpdated
        });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  static navigationOptions = {
    title: "Home"
  };
  render() {
    return this.state.isLoading ? (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f2f8f9"
        }}
      >
        <ActivityIndicator size={50} color="orange" />
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#f2f8f9"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableNativeFeedback
            onPress={() => {
              this.props.navigation.navigate("Billed");
            }}
          >
            <View style={styles.box}>
              <Text style={styles.txt}>Billed Amount</Text>
              <Text style={styles.greenAmt}>{this.state.billed}</Text>
              <Text style={styles.dateTxt}>On {this.state.lastUpdated}</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
              this.props.navigation.navigate("Unbilled");
            }}
          >
            <View style={styles.box}>
              <Text style={styles.txt}>Unbilled Amount</Text>
              <Text style={styles.yellowAmt}>{this.state.unbilled}</Text>
              <Text style={styles.dateTxt}>On {this.state.lastUpdated}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 10
          }}
        >
          <View style={styles.box}>
            <Text style={styles.txt}>Total Receivable</Text>
            <Text style={styles.redAmt}>
              {this.state.billed + this.state.unbilled}
            </Text>
            <Text style={styles.dateTxt}>On {this.state.lastUpdated}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.txt}>Last Paid Amount</Text>
            <Text style={styles.purpleAmt}>{this.state.paidAmt}</Text>
            <Text style={styles.dateTxt}>On {this.state.lastUpdated}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: 170,
    height: 110,
    backgroundColor: "#fff",
    margin: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  greenAmt: {
    fontSize: 20,
    color: "#00ce68",
    margin: 6
  },
  redAmt: {
    fontSize: 20,
    color: "#e65251",
    margin: 6
  },
  yellowAmt: {
    fontSize: 20,
    color: "#ffaf00",
    margin: 6
  },
  purpleAmt: {
    fontSize: 20,
    color: "#8862e0",
    margin: 6
  },
  txt: {
    fontSize: 18,
    color: "#555"
  },
  dateTxt: {
    fontSize: 11,
    color: "#666"
  }
});

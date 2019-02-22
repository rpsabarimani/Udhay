import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, Text, StyleSheet, Animated } from "react-native";
var Snackbar = class Snackbar extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.animatedValue = new Animated.Value(50);
    this.state = {
      msg: "Hi, This is my Snackbar",
      timeout: 10000,
      btnText: "Close"
    };
  }

  show = data => {
    this.setState(data);

    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 400
    }).start();
    setTimeout(() => {
      Animated.timing(this.animatedValue, {
        toValue: 50,
        duration: 400
      }).start();
    }, this.state.timeout);
  };

  hide = () => {
    Animated.timing(this.animatedValue, {
      toValue: 50,
      duration: 400
    }).start();
  };

  render() {
    return (
      <Animated.View
        style={[
          { transform: [{ translateY: this.animatedValue }] },
          styles.SnackBarContainer
        ]}
      >
        <Text style={styles.SnackBarText} numberOfLines={1}>
          {this.state.msg}
        </Text>
        <Text
          style={styles.SnackBarUndoText}
          numberOfLines={1}
          onPress={() => {
            this.props.onPress();
          }}
        >
          {this.state.btnText}
        </Text>
      </Animated.View>
    );
  }
};

const styles = StyleSheet.create({
  SnackBarContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    opacity: 0.8,
    height: 50,
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 25,
    paddingRight: 25
  },
  SnackBarText: {
    color: "#fff",
    fontSize: 18
  },
  SnackBarUndoText: {
    color: "#FFEB3B",
    fontSize: 18,
    position: "absolute",
    right: 10,
    justifyContent: "center",
    padding: 5
  }
});

Snackbar.propTypes = { onPress: PropTypes.func };

export default Snackbar;

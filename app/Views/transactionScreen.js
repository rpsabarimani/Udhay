import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl
} from "react-native";

// const getDrawerHeight= Dimensions.get("window").Height - 100;

export default class transactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txnData: [],
      totalAmt: 0,
      isLoading: true,
      refreshing: false
    };
  }

  _onRefresh() {
    this.fetchTxnDtls();
  }

  fetchTxnDtls() {
    const st = this.props.navigation.getParam("st");
    fetch("https://yt.sabarimani.com/udhay.php?action=getTransactions&st=" + st)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          txnData: responseJson.results.txn,
          refreshing: false,
          totalAmt: responseJson.results.total
        });
        console.log("refreshed");
      });
  }

  componentDidMount() {
    this.fetchTxnDtls();
  }

  render() {
    return this.state.isLoading ? (
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <ActivityIndicator size={50} color="orange" />
      </View>
    ) : (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={styles.container}>
          <FlatList
            refreshControl={
              <RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            onEndReached={({ distanceFromEnd }) => {
              console.log("on end reached ", distanceFromEnd);
            }}
            data={this.state.txnData}
            renderItem={({ item }) => (
              <View>
                <View
                  style={{
                    backgroundColor: "#fff",
                    marginBottom: 10,
                    padding: 10
                  }}
                >
                  <Text style={{ fontSize: 18, color: "#000" }}>
                    {item.place}
                  </Text>
                  <Text style={{ fontSize: 13 }}>{item.dt}</Text>
                  <View style={styles.amtContainer}>
                    <Text style={styles.amtLabel}>Actual Amount :</Text>
                    <Text style={styles.amtText}>{item.actualChrg}</Text>
                  </View>
                  <View style={styles.amtContainer}>
                    <Text style={[styles.clrGreen, styles.amtLabel]}>
                      Discount :
                    </Text>
                    <Text style={[styles.clrGreen, styles.amtText]}>
                      {item.discount}
                    </Text>
                  </View>
                  <View style={styles.netAmtContainer}>
                    <Text style={styles.amtLabel}>Net Amount :</Text>
                    <Text style={styles.amtText}>{item.netChargd}</Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={{ backgroundColor: "#dedede", padding: 10, height: 50 }}>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", textAlign: "right" }}
          >
            Net Total :{this.state.totalAmt}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#efefef",
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  amtContainer: {
    flexDirection: "row",
    marginTop: 6,
    justifyContent: "flex-end"
  },
  netAmtContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#efefef",
    paddingTop: 6,
    marginTop: 6
  },
  amtLabel: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right"
  },
  amtText: { fontSize: 16, width: 80, textAlign: "right" },
  clrGreen: { color: "green" }
});

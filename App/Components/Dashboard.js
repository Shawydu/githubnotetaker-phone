import React, {Component} from 'react';

import {
	Text,
	View,
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
  marginTop: 65,
  flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends React.Component {
  render(){
    return (
    	<View style={styles.container} >
    		<Text> This is the dashboard </Text>
    		<Text> {this.props.userInfo}</Text>
    	</View>
    );
  }
}

module.exports = Dashboard;
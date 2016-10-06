import React, { Component } from 'react';

import {
	View,
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	seperator: {
		height: 1,
		backgroundColor: '#E4E4E4',
		marginLeft: 15,
		marginRight: 10
	}
});

class Separator extends React.Component {
  render(){
    return <View style={styles.seperator} />;
  }
}

module.exports = Separator;
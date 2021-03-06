import React, { Component } from 'react';
import Badge from './Badge';
import Separator from './helper/Separator';
import Web from './helper/Web';

import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
	container: {
    flex: 1,
	},
	rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
	},
	name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
	},
	stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
	},
	description: {
    fontSize: 14,
    paddingBottom: 5
	}
});

class Repositories extends React.Component {
	openPage(url) {
		this.props.navigator.push({
			title: "Web View",
			component: Web,
			passProps: {url}
		});
	}
  render(){
  	var repos = this.props.repos;
  	var list = repos.map((item, index) => {
  		var desp = repos[index].description ? <Text style={styles.description}> { repos[index].description } </Text> : <View />;
  		return (
  			<View key={index}>
  				<View style={styles.rowContainer}>
  					<TouchableHighlight
  						onPress={this.openPage.bind(this, repos[index].html_url)}
  						underlayColor='transparent'>
  						<Text style={styles.name}> {repos[index].name} </Text>
  					</TouchableHighlight>
  					<Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
  					{desp}
  				</View>
  				<Separator />
  			</View>
  		);
  	});
    return (
    	<ScrollView style={styles.container}>
    		<Badge userInfo={this.props.userInfo} />
    		{list}
    	</ScrollView>
    );
  }
}

Repositories.PropTypes = {
	userInfo: React.PropTypes.object.isRequired,
	repos: React.PropTypes.array.isRequired
};

module.exports = Repositories;
import React, {Component} from 'react';
import Profile from './Profile';
import Repositories from './Repositories';
import Notes from './Notes';
import api from '../Utils/api';

import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableHighlight
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
	makeBackground(btn) {
		var styleObj = {
			flexDirection: 'row',
			alignSelf: 'stretch',
			justifyContent: 'center',
			flex: 1
		};

		if (btn === 0) {
			styleObj.backgroundColor = '#48BBEC';
		} else if (btn === 1) {
			styleObj.backgroundColor = '#E77AAE';
		} else {
			styleObj.backgroundColor = '#758BF4';
		}
		return styleObj;
	}
	goToProfile() {
		this.props.navigator.push({
			component: Profile,
			title: 'Profile Page',
			passProps: {userInfo: this.props.userInfo}
		});
	}
	goToRepos() {
		api.getRepos(this.props.userInfo.login)
			.then((res) => {
				this.props.navigator.push({
					component: Repositories,
					title: 'Repos',
					passProps: {
						userInfo: this.props.userInfo,
						repos: res
					}
				});
			});
	}
	goToNotes() {
		api.getNotes(this.props.userInfo.login)
			.then((res) => {
				console.log("Res: ", res);
				res = res || {};
				this.props.navigator.push({
					component: Notes,
					title: 'Notes',
					passProps: {
						userInfo: this.props.userInfo,
						note: res
					}
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
  render(){
    return (
    	<View style={styles.container} >
    	  <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image} />
    	  <TouchableHighlight
    	  	style={this.makeBackground(0)}
    	  	onPress={this.goToProfile.bind(this)}
    	  	underlayColor='#88D4F5'>
    	  		<Text style={styles.buttonText}> View Profile </Text>
    	  </TouchableHighlight>
    	  <TouchableHighlight
    	  	style={this.makeBackground(1)}
    	  	onPress={this.goToRepos.bind(this)}
    	  	underlayColor='#88D4F5'>
    	  		<Text style={styles.buttonText}> View Repos </Text>
    	  </TouchableHighlight>
    	  <TouchableHighlight
	    	  style={this.makeBackground(2)}
    	  	onPress={this.goToNotes.bind(this)}
    	  	underlayColor='#88D4F5'>
    	  		<Text style={styles.buttonText}> View Notes </Text>
    	  </TouchableHighlight>
    	</View>
    );
  }
}

module.exports = Dashboard;
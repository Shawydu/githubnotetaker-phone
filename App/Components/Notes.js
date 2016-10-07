import React, { Component } from 'react';
import Badge from './Badge';
import api from '../Utils/api';
import Separator from './helper/Separator';

import {
	View,
	Text,
	StyleSheet,
	ListView,
	TouchableHighlight,
	TextInput
} from 'react-native';

const styles = StyleSheet.create({
	container: {
    flex: 1,
    flexDirection: 'column'
	},
	buttonText: {
    fontSize: 18,
    color: 'white'
	},
	button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
	},
	searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
	},
	rowContainer: {
    padding: 10
	},
	footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
	}
});

class Notes extends React.Component {
	constructor(props) {
		super();
		this.ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
		this.state = {
			dataSource: this.ds.cloneWithRows(this.props.note),
			note: '',
			err: ''
		};
	}
	handleChange(e) {
		this.setState({
			note: e.nativeEvent.text
		});
	}
	handleSubmit() {
		var note = this.state.note;
		var username = this.props.userInfo.login;
		this.setState({
			note: ''
		});
		console.log("Note: ", note);
		api.addNote(username, note)
			.then((data) => {
				api.getNotes(username)
					.then((data) => {
						this.setState({
							dataSource: this.ds.cloneWithRows(data)
						});
					});
			})
			.catch((error) => {
				console.log('Request failed', error);
				this.setState({
					err: error
				});
			});
	}
	renderRow(rowData) {
		return (
			<View>
				<View style={styles.rowContainer}>
					<Text> {rowData} </Text>
				</View>
				<Separator />
			</View>
		);
	}
	footer() {
		return (
			<View style={styles.footerContainer}>
				<TextInput
					style={styles.searchInput}
					value={this.state.note}
					onChange={this.handleChange.bind(this)}
					placeholder="Add Note" />
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="#88D4F5">
					<Text style={styles.buttonText}> Submit </Text>
				</TouchableHighlight>
			</View>
		);
	}
  render(){
    return (
    	<View style={styles.container}>
    		<ListView
    			dataSource={this.state.dataSource}
    			renderRow={this.renderRow}
    			renderHeader={ () => <Badge userInfo={this.props.userInfo} /> } />
    		{this.footer()}
    	</View>
    );
  }
}

Notes.propTypes = {
	userInfo: React.PropTypes.object.isRequired,
	notes: React.PropTypes.object.isRequired
};

module.exports = Notes;
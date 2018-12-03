import React, { Component } from 'react';
import '../App.css';
import axios from 'axios'
import setAuthentification from '../utils'
import Header from './Header';
import Footer from './Footer';

export default class BaseLayout extends Component {

	
	state = {
		...this.state,
	}
	// === axios.defaults.headers.common['Authorization'].split(' ')
	componentDidMount = () => {

		if (localStorage.jsonwebtoken) {
			console.log(true)
			this.setState({
				authenticated : true
			})
			
		} else {
			console.log(false)
			this.setState({
				authenticated : false
			})
		}
	}

	render() {

		
		return (
			<div className="App">
				<Header isAuthenticated = {this.state.authenticated} />
					<div className="header-padding"></div>
					{this.props.children}
				<Footer />
			</div>
		);
	}
}


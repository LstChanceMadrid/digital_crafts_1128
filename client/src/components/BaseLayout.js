import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import Footer from './Footer';

export default class BaseLayout extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}


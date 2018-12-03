import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'




export default class Header extends Component {

	constructor(props) {
		super(props)

		this.state = {
			response : '',
			search : '',
			responseToSearch : '',
		}
	}


	componentDidMount() {

		  this.callSearchApi().then(res => {
			  this.setState({search : res.search})
		  }).catch(err => {
			  console.log(err)
		  })
	  }

	callSearchApi = async () => {
		const search = await fetch('/api/world')
		const body = await search.json();

		if (search.status !== 200) throw Error(body.message);

		return body
	}

	handleSearchTextBoxOnChange = (e) => {

		this.setState({
			[e.target.name] : e.target.value
		})
	}

	handleSearchButtonClick = async e => {

		e.preventDefault();

		const response =  await fetch('/api/search', {
			method: 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify({search : this.state.search})
		});
		
		const body = await response.text();

		this.setState({responseToSearch : body});
	}


	render() {

		const headerAuthenticated = () => {
			return <ul className="nav-list">
					<li><Link to = "/">Home</Link></li>

					<li><Link to = "/my-books">My Books</Link></li>

					<li>Browse <i className="fa fa-caret-down"></i></li>

					<li>Community <i className="fa fa-caret-down"></i></li>

					<div  className="search-bar-container">
						<form onSubmit={this.handleSearchButtonClick}>
							<input className="search-bar"  type="text" onChange={this.handleSearchTextBoxOnChange} name="search" placeholder="Search" value={this.props.search} />

							<input className="magnifying-glass" type="submit" value="" />
						</form>
					</div>
					
					<li><Link to = "/login">Log In</Link></li>

					<li><Link to = "/register">Register</Link></li>

					<i id="hamburger" className="fa fa-bars"></i>
				</ul>

		}

		const headerNotAuthenticated = () => {
			return <ul className="nav-list">
			<li><Link to = "/">Home</Link></li>

			<li>Browse <i className="fa fa-caret-down"></i></li>

			<li>Community <i className="fa fa-caret-down"></i></li>

			<div  className="search-bar-container">
				<form onSubmit={this.handleSearchButtonClick}>
					<input className="search-bar"  type="text" onChange={this.handleSearchTextBoxOnChange} name="search" placeholder="Search" value={this.props.search} />

					<input className="magnifying-glass" type="submit" value="" />
				</form>
			</div>
			
			<li><Link to = "/logout">Log Out</Link></li>


			<i id="hamburger" className="fa fa-bars"></i>
		</ul>
		}

		return (
		<div className="header-container">
			<label><NavLink className="logo" to = "/">good<b>reads</b></NavLink></label>

			<nav className="nav-container">
				{this.props.isAuthenticated ? headerAuthenticated() : headerNotAuthenticated()}
			</nav>
		</div>


		)
	}
}

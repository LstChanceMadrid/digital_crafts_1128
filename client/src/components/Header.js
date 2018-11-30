import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'




export default class Header extends Component {

	constructor(props) {
		super(props)

		this.state = {
			response : '',
			search : '',
			responseToSearch : ''
		}
	}

	// state = {
	// 	response : '',
	// 		search : '',
	// 		responseToSearch : ''
	// }

	componentDidMount() {
		this.callApi()
		  .then(res => this.setState({ response: res.express }))
		  .catch(err => console.log(err));

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
	

	callApi = async () => {
		const response = await fetch('/api/hello');
		const body = await response.json();

		if (response.status !== 200) throw Error(body.message);

		return body;
	};


	handleSearchTextBoxOnChange = (e) => {
		console.log(e.target.name)
		console.log(e.target.value)

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
		console.log(this.state.responseToSearch)
	}


	render() {
		return (
		<div className="header-container">
			<label><NavLink className="logo" to = "/">good<b>reads</b></NavLink></label>

			<nav className="nav-container">
				<ul className="nav-list">
					<li><Link to = "/">Home</Link></li>
						{/* // #link and navlink can be accessed form .nav-list a */}

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
			</nav>

			<p>{this.state.responseToSearch}</p>
		</div>


		)
	}
}

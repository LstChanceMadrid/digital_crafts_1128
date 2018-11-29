import React, { Component } from 'react'


const LOGIN_URL = 'http://localhost:3000/login'




export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user : {}
        }
    }

    handleLoginButtonCLick() {
        let user = this.state.user;

        fetch(LOGIN_URL, {
            method : 'POST',
            headers : {
                'ContentType' : 'application/json'
            },
            body : JSON.stringify(user)
        }).then(response => {
            return response.json()
        }).then(json => {
            console.log(json)
            this.props.history.push('/')
        })
    }

    handleTextBoxChange = (e) => {

        this.setState({
            user : {
                ...this.state.user,
                [e.target.name] : e.target.value
            }
        })
    }

    render() {
        return (
            <div className="login-form-container">
                <h1 class="page-title">Login</h1>
                <form onSubmit={this.handleLoginButtonCLick}>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleTextBoxChange} autoFocus required />

                    <input type="text" name="password" placeholder="Password" onChange={this.handleTextBoxChange} required />

                    <input type="submit" value="Log In" />
                </form>
            </div>
        )
    }
}

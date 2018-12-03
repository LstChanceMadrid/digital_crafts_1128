import React, { Component } from 'react'
import axios from 'axios'
import {setAuthenticationToken} from '../utils'

const LOGIN_URL = 'http://localhost:3000/api/login'




export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user : {},
        }
    }

    handleLoginButtonCLick = async e => {

        let user = this.state.user;

        e.preventDefault();

        console.log(user)
        axios.post(LOGIN_URL, {
            username : user.username,
            password : user.password
        }).then(response => {
            localStorage.setItem('jsonwebtoken', response.data.token)

            setAuthenticationToken(response.data.token)
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
        console.log(this.props)
        return (
            <div className="login-form-container">
                <h1 className="page-title">Login</h1>
                <form onSubmit={this.handleLoginButtonCLick}>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleTextBoxChange} autoFocus autoComplete="true" required />

                    <input type="password" name="password" placeholder="Password" onChange={this.handleTextBoxChange} autoComplete="true" required />

                    <input type="submit" value="Log In" />
                </form>
            </div>
        )
    }
}

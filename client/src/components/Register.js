import React, { Component } from 'react'


const REGISTER_URL = 'http://localhost:3000/api/register'




export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user : {}
        }
    }

    handleTextBoxChange = (e) => {

        this.setState({
            user : {
                ...this.state.user,
                [e.target.name] : e.target.value
            }
        })
    }

    handleRegisterButtonCLick = async e => {
        let user = this.state.user
        e.preventDefault();

        const response = await fetch('/api/register', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({user : user})
            
        })
        console.log(response)    
    }



    render() {
        return (
            <div className="register-form-container">
                <h1 className="page-title">Register</h1>

                <form className="register-form" onSubmit={this.handleRegisterButtonCLick}>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleTextBoxChange} autoFocus required />

                    <input type="text" name="firstname" placeholder="First Name" onChange={this.handleTextBoxChange} required />

                    <input type="text" name="lastname" placeholder="Last Name" onChange={this.handleTextBoxChange} required />

                    <input type="text" name="email" placeholder="Email" onChange={this.handleTextBoxChange} required />

                    <input type="text" name="password" placeholder="Password" onChange={this.handleTextBoxChange} required />

                    <input type="submit" value="Register" />
                </form>
            </div>
        )
    }
}

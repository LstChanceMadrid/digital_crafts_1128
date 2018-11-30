import React, { Component } from 'react'


// const REGISTER_URL = 'http://localhost:5000/api/register'




export default class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user : {}
        }
    }

    handleRegisterButtonCLick = async e => {

        let user = this.state.user;

        e.preventDefault();

        fetch('http://localhost:5000/api/register', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user)
            
        }).then(function(response){
            return response.JSON
        }).then(function(res){
            console.log(res)
        })
        // console.log(user)
    }

    handleRegisterTextBoxChange = (e) => {

        this.setState({
            user : {
                ...this.state.user,
                [e.target.name] : e.target.value
            }
        })
    }

    render() {
        return (
            <div className="register-form-container">
                <h1 className="page-title">Register</h1>

                <form className="register-form" onSubmit={this.handleRegisterButtonCLick}>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleRegisterTextBoxChange} autoFocus required />

                    <input type="text" name="firstname" placeholder="First Name" onChange={this.handleRegisterTextBoxChange} required />

                    <input type="text" name="lastname" placeholder="Last Name" onChange={this.handleRegisterTextBoxChange} required />

                    <input type="text" name="email" placeholder="Email" onChange={this.handleRegisterTextBoxChange} required />

                    <input type="text" name="password" placeholder="Password" onChange={this.handleRegisterTextBoxChange} required />

                    <input type="submit" value="Register" />
                </form>
            </div>
        )
    }
}

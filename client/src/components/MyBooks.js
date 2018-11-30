
import React, { Component } from 'react'
import axios from 'axios';
import { setAuthenticationToken } from '../utils';
import Header from './Header'

const MY_BOOKS_URL = "http://localhost:5000/api/my-books"


export default class MyBooks extends Component {

    constructor(props) {
        super(props)

        this.state = {
            books : []
        }
    }
    
    componentDidMount() {

        let token = localStorage.getItem('jsonwebtoken')

        setAuthenticationToken(token)

        axios.get(MY_BOOKS_URL)
        .then(response => {

            this.setState({
                ...this.state.books,
                books : response.data.books
            })            
        })
    }
    
    render() {
        let bookItems = this.state.books.map(index => {
            return (
                <div>
                    <Header />
                    {index.title}
                </div>
            )
        })
        
        return (
            <div className="my-books-container">
            <h1>My Books Page</h1>
            {bookItems}
            </div>
        )
    }

}

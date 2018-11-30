
import React, { Component } from 'react'
import axios from 'axios';
import { setAuthenticationToken } from '../utils';

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
            console.log(this.state.books[0].title)
            
            })
    }
    
    render() {
        let bookItems = this.state.books.map(index => {
            return (
                <div>
                    {index.title}
                </div>
            )
        })
        
        return (
            <div className="my-books-container">
            {bookItems}
            </div>
        )
    }

}

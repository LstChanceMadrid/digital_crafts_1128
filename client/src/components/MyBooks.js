
import React, { Component } from 'react'
import axios from 'axios';
import { setAuthenticationToken } from '../utils';

const MY_BOOKS_URL = "http://localhost:5000/api/my-books"
const DELETE_BOOK_URL = "http://localhost:5000/api/delete-book"
const UPDATE_BOOK_URL = "http://localhost:5000/api/update-book"

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

    handleDeleteBookClick = (book) => {
        console.log(book)
    }

    handleUpdateBookClick = (book) => {
        
    }


    
    render() {
        let bookItems = this.state.books.map((bookItem, index) => {
            return (
                <div>
                    <div key={bookItem.index}>{bookItem.title}</div>
                    <input type="hidden" name="hidden" value={bookItem.title} />
                    <input type="submit" onSubmit={this.handleUpdateBookClick(bookItem.title)} value="Update Book" />
                    <input type="submit" onSubmit={this.handleDeleteBookClick} value="Delete Book" />
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

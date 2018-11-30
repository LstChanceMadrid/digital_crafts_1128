
import React, { Component } from 'react'
import BookList from './BookList'

const BOOKS_URL = "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json"


export default class Content extends Component {

    constructor(props) {
        super(props)

        this.state = {
            books : []
        }
    }
    
    componentDidMount() {

        fetch(BOOKS_URL).then(response => {
            return response.json()
        }).then(json => {

            this.setState({
                books : json
            })
        })
    }

    
    render() {
        return (
            <div className="content-container">
                <h1 className="page-title">Home</h1>
                
                <BookList books = {this.state.books}/>
            </div>
        )
    }

}


import React, { Component } from 'react'
import BookList from './BookList'
import Menu from './Menu'

const MY_BOOKS_URL = "/my-books"


export default class Content extends Component {

    constructor(props) {
        super(props)

        this.state = {
            books : []
        }
    }
    
    componentDidMount() {

        fetch(MY_BOOKS_URL).then(response => {
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
                hellloo
                
                <Menu />
                <BookList books = {this.state.books}/>
            </div>
        )
    }

}

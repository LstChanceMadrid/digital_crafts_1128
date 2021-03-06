import React, { Component } from 'react'

const IMAGES_URL = "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/"


export default class BookList extends Component {






  render() {

    let bookItems = this.props.books.map((book, index) => {
        return (<div key={book.imageLink}>
              <div>{book.title}</div>
              <img src={`${IMAGES_URL}${book.imageLink}`} alt={`${book.title}'s book cover`}/>
            </div>
        )
    })

    return (
      <div className="book-list-container">
        {bookItems}
      </div>
    )
  }
}

import React, { Component } from 'react';
import { Query } from "react-apollo";

import { BookDetails } from "./index";
import { GET_ALL_BOOKS } from "../queries";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: ""
    }
  }

  getBookDetails = (id) => {
    this.setState({
      bookId: id
    })
  }

  render() {
    return (
      <Query
        query={ GET_ALL_BOOKS }
      >
        { ({ loading, error, data }) => {
          if(loading) return <p>Loading...</p>;
          if(error) return <p>Error. { error.message }</p>;

          return (
            <div id="book-list">
              <h1>Alabi's Reading List</h1>
              <ul className="list">
                  { data.books.map(book => <li key={ book.id } onClick={ () => this.getBookDetails(book.id) }>{ book.name }</li>) }
              </ul>
              <BookDetails bookId={ this.state.bookId }/>
            </div>
          )
        } }
      </Query>
    )
  }
}

export default BookList;

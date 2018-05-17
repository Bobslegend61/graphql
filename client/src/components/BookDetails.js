import React from 'react';
import { Query, Mutation } from "react-apollo";
import { GET_A_BOOK, DELETE_BOOK, GET_ALL_BOOKS } from "../queries";

const BookDetails = ({ bookId }) => {
  return (
      <Query
        query={ GET_A_BOOK }
        variables={{ bookId }}
        skip={ !bookId }
      >
        { ({ loading, error, data: { book } }) => {
            if(loading) return <div id="book-details">Book Details Here</div>;
            if(error) return `Error! ${ error.message }`;

            return (
                <div id="book-details">
                    <h2>{ book.name.toUpperCase() }</h2>
                    <p>{ book.genre }</p>
                    <p><strong><em>{ book.author.name }</em></strong></p>
                    <h5>OTHER BOOKS</h5>
                    <ul>
                        { book.author.books.map(book => {
                            return <li key={ book.id }>{ book.name }</li>;
                        }) }
                    </ul>
                    <Mutation
                        mutation={ DELETE_BOOK }
                        update={ (cache, { data: { deleteBook } }) => {
                            const { books } = cache.readQuery({ query: GET_ALL_BOOKS });
                            cache.writeQuery({
                                query: GET_ALL_BOOKS,
                                data: { books }
                            });
                        } }
                    >
                        { (deleteBook, { loading, error }) => (
                            <button onClick={ e => {
                                deleteBook({
                                    variables: {
                                        id: bookId
                                    }
                                })
                            } }>Delete</button>
                        ) }
                    </Mutation>
                </div>
            )
        } }
      </Query>
  )
}

export default BookDetails;

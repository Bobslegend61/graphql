import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { GET_ALL_AUTHORS, ADD_BOOK, GET_ALL_BOOKS } from "../queries";

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }

    onInputChanged = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <Query query={ GET_ALL_AUTHORS }>
                { ({ loading, error, data: { authors } }) => {
                    if(loading) return "Loading form...";
                    if(error) return `Error! ${ error.message }`;

                    return (
                        <Mutation
                            mutation={ ADD_BOOK }
                            update={ (cache, { data: { addBook } }) => {
                                const { books } = cache.readQuery({ query: GET_ALL_BOOKS });
                                cache.writeQuery({
                                    query: GET_ALL_BOOKS,
                                    data: { books: books.concat([addBook]) }
                                })
                            } }
                        >
                            { (addBook, { loading, error }) => (
                                <div id="add-book">
                                    <h3>Add Book</h3>
                                    <form onSubmit={ e => {
                                        e.preventDefault();
                                        addBook({
                                            variables: {
                                                name: this.state.name,
                                                genre: this.state.genre,
                                                authorId: this.state.authorId
                                            }
                                        });
                                        this.setState({
                                            name: "",
                                            genre: "",
                                            authorId: ""
                                        })
                                    } }>
                                        <div className="field">
                                            <label>Name:</label>
                                            <input type="text" name="name" value={ this.state.name } onChange={ this.onInputChanged }/>
                                        </div>
                                        <div className="field">
                                            <label>Genre:</label>
                                            <input type="text" name="genre" value={ this.state.genre } onChange={ this.onInputChanged } />
                                        </div>
                                        <div className="field">
                                            <label>Author:</label>
                                            <select name="authorId" onChange={ this.onInputChanged } >
                                                { authors.map(author => <option key={ author.id } value={ author.id }>{ author.name }</option>) }
                                            </select>
                                        </div>
                                        <button type="submit">+</button>
                                    </form>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>Error :( Please try again</p>}
                                </div>
                                )
                            }
                        </Mutation>
                    )
                } }
            </Query>
        )
    }
}

export default AddBook;

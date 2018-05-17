import gql from "graphql-tag";

const GET_ALL_BOOKS = gql`
    {
        books {
            name
            genre
            id
        }
    }
`;

const GET_ALL_AUTHORS = gql`
    {
        authors {
            name
            age
            id
        }
    }
`;

const GET_A_BOOK = gql`
    query book($bookId: ID!) {
        book(id: $bookId) {
            name
            genre
            author {
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;

const ADD_BOOK = gql`
    mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            genre
            id
        }
    }
`;

const DELETE_BOOK = gql`
    mutation deleteBook($id: ID!) {
        deleteBook(id: $id) {
            name
            id
        }
    }
`


export { GET_ALL_BOOKS, GET_ALL_AUTHORS, GET_A_BOOK, ADD_BOOK, DELETE_BOOK };
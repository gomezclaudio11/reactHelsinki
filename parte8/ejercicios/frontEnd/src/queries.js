import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    title
    published
    author{
        name
    }
    id
    genres
  }
`

export const ALL_AUTHORS = gql `
    query {
        allAuthors {
            name
            born
            id
            bookCount
        }
    }
`
export const ALL_BOOKS = gql `
    query allBooks($genre: String) {
        allBooks (genre: $genre){
            title
            published
            author{
                name
            }
            id
            genres
        }
    }
`


export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!, 
    $published: Int!, 
    $author: String!, 
    $genres: [String!]!
    ){
      addBook(
        title: $title,
        published: $published,
        author: $author,
        genres: $genres
    ) {
        title
        published
        author{
            name
            id
            born
        }
        genres
    }
  }
`

export const EDIT_BIRTHYEAR = gql `
    mutation editAuthor(
        $name: String!, 
        $setBornTo: Int!
        ){
        editAuthor(
            name: $name, 
            setBornTo: $setBornTo
        ) {
            name
            born
        }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...bookDetails
    }
  }
  
${BOOK_DETAILS}
`


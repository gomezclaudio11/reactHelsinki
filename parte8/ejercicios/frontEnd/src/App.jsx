import { useState } from "react";
import { useQuery,
        useApolloClient,
        useSubscription
 } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
import SetBirthYear from "./components/SetBirthYear";
import Recommendations from "./components/Recommendations";

//Helper
export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => { //evita duplicados
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
//reemplaza los datos del query ALL_BOOK con la nueva lista.
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
   const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState("authors");
  const authorsResult = useQuery(ALL_AUTHORS, { pollInterval:2000 })
  const booksResult = useQuery(ALL_BOOKS, { pollInterval:2000 })
  const [token, setToken] = useState(null)
  const client = useApolloClient()

    //suscripcion en tiempo real
    useSubscription(BOOK_ADDED, {
      onData: ({ data }) => {
        const addedBook = data.data.bookAdded
        notify(`${addedBook.name} added`) //Muestra notificación
        //mete a la persona en la lista
        updateCache (client.cache, { query: ALL_AUTHORS }, addedBook)
      }
    })

   if (authorsResult.loading || booksResult.loading)  {
    return <div>loading...</div>
  }

  if (authorsResult.error || booksResult.error) {
  console.log(authorsResult.error || booksResult.error);
  return <div>{authorsResult.error?.message || booksResult.error?.message}</div>;
}
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
    const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

   //Render (cuando no hay login)
  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage("Books")}>Books</button>
        <button onClick={() => setPage("Authors")}>Authors</button>
        <button onClick={() => setPage("Add Book")}>Add book</button>
        <button onClick={() => setPage("Set birthDay")}>Set birthDay</button>
        <button onClick={() => setPage("Recommendations")}>Recommendations</button>
      </div>
      <Notify errorMessage={errorMessage}/>
      <button onClick={logout}>logout</button>

      <Authors authors={authorsResult.data.allAuthors} show={page === "Authors"} />

      <Books show={page === "Books"} />

      <NewBook setError={notify} show={page === "Add Book"} />

      <SetBirthYear setError={notify} show={page === "Set birthDay"}/>  

      <Recommendations books={booksResult.data.allBooks} show={page === "Recommendations"}/>  
    </div>
  );
};

export default App;
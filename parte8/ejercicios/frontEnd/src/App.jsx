import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";
import SetBirthYear from "./components/SetBirthYear";

const App = () => {
   const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState("authors");
  const authorsResult = useQuery(ALL_AUTHORS, { pollInterval:2000 })
  const booksResult = useQuery(ALL_BOOKS, { pollInterval:2000 })

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
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <Notify errorMessage={errorMessage}/>
      <Authors authors={authorsResult.data.allAuthors} show={page === "authors"} />

      <Books books={booksResult.data.allBooks} show={page === "books"} />

      <NewBook setError={notify} show={page === "add"} />

      <SetBirthYear/>    
    </div>
  );
};

export default App;
/**CODIGO ORIGINAL SIN REFACTORIZAR */
/**
 const App = () => {
  const [user, setUser] = useState(null)

  if (!user) {
    return (
      <div>
        <h2>Login</h2>
        <form>
          <input />
          <button>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={() => setUser(null)}>logout</button>
    </div>
  )
}

 */
import { useState } from "react"

const LoginForm = ({ onLogin }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        const user = { name: "Tobias" }//simula un login exitosoo
        onLogin(user)
    }
    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="username"/>
          <button type="submit">login</button>
        </form>
      </div>
    )
}

const UserPanel = ({ user, onLogout }) => {
  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={onLogout}>logout</button>
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogin = (user) => {
    setUser(user)
  }
  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div>
        {
            user
            ? <UserPanel user={user} onLogout={handleLogout}/>
            : <LoginForm onLogin={handleLogin}/>
        }
    </div>
  )

}

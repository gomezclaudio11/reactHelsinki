import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../src/queries'

const LoginForm = ({ setError, setToken }) => {
//maneja los valores de los inputs
  const [username, setUsername] = useState('Gaston')
  const [password, setPassword] = useState('secret')

/**
 useMutation devuelve:
    login → función que ejecuta la mutation.
    result → objeto con el estado de la mutation (data, loading, error, etc).
 */
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

//se ejecuta cada vez que cambia result.data
  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value//extrae el token
      setToken(token) //Lo guarda en el estado global 
      localStorage.setItem('phonenumbers-user-token', token) 
      //Lo guarda en localStorage, para que el usuario siga logueado incluso si recarga la página. 
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
//Ejecuta la mutation LOGIN
    login({ variables: { username, password } })
  }

  //Render del formulario
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm

/**USEEFFECT */
/**
 La mutation login es asíncrona.
result.data no está disponible inmediatamente después de llamar a login(...).
En el primer render, result.data es undefined.
Solo después de que el servidor responde exitosamente, Apollo cambia result.data.

 useEffect está "escuchando" cambios en result.data.
Cuando result.data deja de ser undefined y tiene el token, el efecto se dispara y entonces:
    Actualizamos el estado global con setToken(token).
    Persistimos el token en localStorage.
Si intentaras hacerlo directo en el submit, te arriesgas a que todavía no haya respuesta del servidor.

¿Cuándo usar useEffect?

Podés pensar en useEffect como: "ejecutar código extra cada vez que algo cambia".
Se usa cuando:
    Querés reaccionar a un cambio en props o state
    Ej: useEffect(() => { ... }, [result.data]) → reacciona cuando result.data cambia.

    Necesitás efectos secundarios (side effects) 
    que no son parte directa del render:
        Llamar a una API (fetch, axios, Apollo).
        Guardar datos en localStorage.
        Manejar suscripciones (ej: websockets).
        Modificar algo fuera de React (ej: document.title).

    Inicializar datos al montar el componente
    Ej: useEffect(() => { fetchData() }, []) → corre solo una vez.

 ¿Cuándo NO usar useEffect?

Para cálculos que podés hacer directamente en el render.
Para lógica que depende solo de props/estado inmediato 
(sin efectos externos).
Para manejar cambios que ya resuelve otro hook 
(ej: useQuery ya hace fetch).
*/
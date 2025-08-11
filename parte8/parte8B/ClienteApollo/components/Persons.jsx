import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Person from './Person';
import { FIND_PERSON } from '../src/queries';//recibe un nombre y devuelve datos de esa persona.

const Persons = ({ persons }) => {
    const [nameToSearch, setNameToSearch] = useState(null)//Estado inicial null → significa que no se está buscando a nadie todavía.
     const result = useQuery(FIND_PERSON, {
        variables: { nameToSearch },
        skip: !nameToSearch, // truco para no ejecutar la query si nameToSearch es null o vacío.
//Así evitas llamadas innecesarias al backend.
    })

    // Render condicional (detalle de una persona)
    if (nameToSearch && result.data) {
        return (
            <Person
                person={result.data.findPerson}
                onClose={() => setNameToSearch(null)}
            />
        )
    }

    //Render lista de personas
  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>
            show address
          </button>
        </div>
      ))}
    </div>
  )
}
//Cuando el usuario aprieta un botón, este estado se convierte en un string con el nombre de la persona.
export default Persons
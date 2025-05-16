import { useState, useEffect } from 'react'
import Country from './components/Country'
import countriesService from "./services/countries"

  const App = () => {
    const [countries, setCountries] = useState([])
    const [filterr, setFilter] = useState("")
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
      countriesService
        .getAll()
        .then(data => {
          setCountries(data)
        })
    }, [])
    
    const handleShow = (country) => {
      setSelectedCountry(country)
    }

    const filtered = countries.filter(country => 
      country.name.common.toLowerCase().includes(filterr.toLowerCase()) )
     
    return (
      <div>
        <div>
          find the countries <input value={filterr} onChange={(e) => {
            setFilter(e.target.value)
            setSelectedCountry(null) //limpiar selección si se cambia el filtro
          }}
            />
        </div>

        <div>
          {
            filtered.length > 10 && <p>too many match, specify another filter</p>
          }
          {
            filtered.length === 1 && (
              <Country country={filtered[0]}/>
            )
          }
          {
            filtered.length <= 10 && filtered.length >1 && (
              filtered.map(country => (
                <div key ={country.name.common}>
                  {country.name.common}
                  <button onClick={() => handleShow(country)}>show</button>
                </div>
              )) 
            )}
            {
              selectedCountry && filtered.length > 1 &&(
                <Country country={selectedCountry}/>
              )
            }
        </div>
        </div>
          )
          }
          
  export default App 
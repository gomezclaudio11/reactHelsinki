const Country = ({ country }) => {
  return (
  <div>
    <h2> {country.name.common}</h2>
    <p><strong>Capital:</strong> {country.capital ? country.capital.join(", ") : "N/A"}</p>
    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
    <h3>Languages:</h3>
      <ul>
        {country.languages &&
          Object.values(country.languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))
        }
      </ul>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        width="150"
        style={{ border: "1px solid #ccc", marginTop: "10px" }}
      />
  </div>
  )
}

export default Country

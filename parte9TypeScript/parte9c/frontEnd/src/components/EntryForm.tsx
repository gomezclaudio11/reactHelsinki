import React, { useState } from 'react';
import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry} from '../types';
import { Weather, Visibility } from '../types';

//void se utiliza para indicar que esas props son funciones 
// que no devuelven un valor significativo o que no necesitas
//  capturar ni usar el valor devuelto.
interface EntryFormProps {
  onNewEntry: (entry: DiaryEntry) => void;
  onError: (message: string) => void;
}

// Convertir Enums a Arrays de opciones para los radios
const weatherOptions = Object.values(Weather);
const visibilityOptions = Object.values(Visibility);

const EntryForm: React.FC<EntryFormProps> = ({ onNewEntry, onError }) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    try {
      // Llama al servicio para crear la entrada
      const data = await axios.post<DiaryEntry>('http://localhost:3000/api/diaries', newEntry);
      
      // Llama a la función prop para actualizar el estado en App
      onNewEntry(data.data); 
      
      // Limpia el formulario y los errores
      onError('');
      setDate('');
      setComment('');

    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // Muestra el mensaje de error del backend (validación)
        onError(error.response.data as string);
      } else {
        onError("An unknown error occurred.");
      }
    }
  };

  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Agregar Nueva Entrada</h2>
      <form onSubmit={addEntry}>
        
        {/* Input de Fecha */}
        <div style={{ marginBottom: '10px' }}>
          <label>Fecha: </label>
          <input 
            type="date"
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required
          />
        </div>

        {/* Radio Buttons de Clima */}
        <div style={{ marginBottom: '10px' }}>
          <label>Clima: </label>
          {weatherOptions.map(option => (
            <span key={option} style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={() => setWeather(option)}
                required
              />
              {option}
            </span>
          ))}
        </div>

        {/* Radio Buttons de Visibilidad */}
        <div style={{ marginBottom: '10px' }}>
          <label>Visibilidad: </label>
          {visibilityOptions.map(option => (
            <span key={option} style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option)}
                required
              />
              {option}
            </span>
          ))}
        </div>

        {/* Input de Comentario */}
        <div style={{ marginBottom: '20px' }}>
          <label>Comentario: </label>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        
        <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Agregar
        </button>
      </form>
    </div>
  );
};

export default EntryForm;
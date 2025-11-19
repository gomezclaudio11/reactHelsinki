import React, { useState, useEffect } from 'react';
import type { DiaryEntry } from './types';
import { getAllEntries } from './diaryService';
import DiaryEntryItem from './components/DiaryEntry';
import EntryForm from './components/EntryForm';
import { Alert } from '@mui/material'; // Usamos MUI para un mejor manejo de errores (si está instalado)

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>('');

  //Obtener los diarios del backend al cargar
  useEffect(() => {
    getAllEntries()
      .then(data => {
        setDiaries(data);
      })
      .catch((error) => {
        // En caso de error de red o CORS, mostramos un mensaje
        if (error instanceof Error) {
            setError(`Error al cargar los diarios: ${error.message}. Asegúrate de que el backend esté corriendo en http://localhost:3000 y CORS esté configurado.`);
        } else {
            setError("Un error desconocido ocurrió al cargar los datos.");
        }
      });
  }, []);

  // Callback para manejar la adición de una nueva entrada 
  const handleNewEntry = (newEntry: DiaryEntry) => {
    setDiaries(diaries.concat(newEntry));
    setError(''); // Limpiar cualquier error previo
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Diario de Vuelos</h1>
      
      {/* Manejo de Errores */}
      {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}

      {/* Formulario para agregar entradas */}
      <EntryForm onNewEntry={handleNewEntry} onError={setError} />
      
      <h2>Entradas del Diario</h2>
      
      {/* Mostrar las entradas */}
      {diaries.map(entry => (
        <DiaryEntryItem key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default App;
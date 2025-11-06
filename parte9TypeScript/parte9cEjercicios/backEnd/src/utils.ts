import { NewPatient, Gender } from "./types";

// Funciones de validación de tipo

//Predicado de Tipo (Type Predicate).
//Si esta función devuelve true, entonces el argumento text que pasaste es, 
// a partir de este momento garantizado de ser de tipo string."
const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
}

const isDate = (date: string) : boolean => {
    return Boolean(Date.parse(date))
}

// Predicado de tipo para el Enum Gender 
const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => String(v)).includes(param);
};

// Funciones de parseo individual
const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect dateOfBirth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    // Si no es una cadena o no es un valor del enum Gender
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

// Función principal de parseo


// Predicado de tipo principal para la entrada de pacientes
const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data: Expected object');
  }

  // Se verifica que existan todos los campos obligatorios
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      // Si Patient tuviera un campo 'entries', se añadiría una inicialización aquí.
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;

/**
 Anotación de Tipo de TypeScript (: NewPatient)

Esta es la parte de TypeScript (la anotación de tipo, marcada con los dos 
puntos :). El tipo NewPatient es una Interfaz o Tipo de Utilidad que definimos
previamente 
Al agregar : NewPatient, le estás diciendo al compilador de TypeScript:
    "Garantizo que el objeto que estoy creando a la derecha ({ ... }) cumple 
    con la estructura exacta definida por el tipo NewPatient."
 */
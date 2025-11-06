export interface Diagnosis {
    code: string,
    name: string,
    latin?: string  //campo opcional
}

//Gender es el nombre del enumerador.
//.Male es el miembro del enumerador.
//= "male" es el valor real que se asignará al campo gender en el objeto paciente.

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

// Tipo de dato completo del paciente (incluyendo información sensible)
export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
}

// Tipo de dato del paciente sin información sensible (ssn y entries)
export type PublicPatient = Omit<Patient, "ssn">

export type NewPatient = Omit<Patient, "id">;
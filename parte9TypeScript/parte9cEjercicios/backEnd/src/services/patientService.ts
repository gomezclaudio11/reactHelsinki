import patients from "../../data/patients";
import { PublicPatient, NewPatient, Patient } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

const addPatient = (entry: NewPatient): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
}
export default {
    getPatients,
    addPatient
}
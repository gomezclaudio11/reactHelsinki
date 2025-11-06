import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getPatients());
}); 


router.post('/', (req, res) => {
  try {
    // Usar el utility para validar y parsear el cuerpo de la solicitud
    const newPatientEntry = toNewPatientEntry(req.body);

    // Agregar el paciente usando el servicio
    const addedPatient = patientService.addPatient(newPatientEntry);

    // Responder con el nuevo paciente
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    // Devolver un error 400 (Bad Request) si la validación falla
    res.status(400).send(errorMessage);
  }
});

export default router;
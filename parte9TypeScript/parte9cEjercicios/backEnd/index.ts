import express from 'express';
import cors from 'cors';
import diagnosisRouter from "./src/routes/diagnoses";
import patientRouter from "./src/routes/patients";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
    console.log("SOMEONE PINGED HERE");
    res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);    
})
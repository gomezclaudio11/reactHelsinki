import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { error } from "console";

const app = express()
app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong")
})

app.get("/hello", (req, res) => {
    res.send("Hello Full Stak")
})

app.get("/bmi/:height/:weight", (req, res) => {
    try {
        const height = Number (req.params.height)
        const weight = Number (req.params.weight)
        
        if(!height || !weight) {
            return res.status(400).json({
                error: 'malformatted parameters'
            })
        }
        const bmi = calculateBmi(height, weight)
        return res.json(bmi)
    } catch (error: unknown) {
        return res.status(400).json({
            error: "malformatted parameters"
        })
    }   
})

app.post("/exercises", (req, res) => {
    try{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = req.body as any;

    if(!body.daily_exercises || !body.target) {
        return res.status(400).json({
            error: "parameters missing"
        })
    }

    if(!Array.isArray(body.daily_exercises)) {
        return res.status(400).json({
            error: "malformatted parameters1"
        })
    }

    const target = Number(body.target);
    if(isNaN(target)) {
        return res.status(400).json({
            error: "malformatted parameters2"
        })
    }
    //validar que todos los elementos de daile_exercises sean numeros
    const dailyExercises: number[] = [];
    for(const exercise of body.daily_exercises) {
        const exerciseNum = Number(exercise)
        if(isNaN(exerciseNum)) {
            return res.status(400).json({
                error: "malformatted parameters3"
            })
        }
        dailyExercises.push(exerciseNum)
    }

    //calcular resultado
    const result = calculateExercises(dailyExercises, target)
    return res.json(result)
    } catch (error: unknown){
        return res.status(400).json({
            error: "malformatted parameters4"
        })
    }
})


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    
})
const calculateBmi = (height: number, weight: number) => {
    const heightInMeters = height /100
    const bmi = weight / (heightInMeters * heightInMeters)  

    if (bmi < 18.5) {
        return "UNDERWEIGHT"
    } else if (bmi < 25) {
        return "normal (healthy weight)"
    } else if (bmi < 30) {
        return "overweight"
    } else {
        return "obese"
    }
}

console.log(calculateBmi(180, 74));

export default calculateBmi

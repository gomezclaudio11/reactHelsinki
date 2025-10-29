interface Result {
 periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}
interface ExerciseValues {
  dailyHours: number[];
  target: number;
}

// args[0] = ejecutable node
  // args[1] = archivo .ts
  // args[2] = target (objetivo)
  // args[3...] = horas diarias
const parseArguments2 = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const target = Number(args[2])
    if (isNaN(target)) {
        throw new Error(`Target must be a number, got: ${args[2]}`)
    }
    const dailyHours: number [] = [];
    for (let i= 3; i < args.length; i++) {
        const hours = Number(args[i])

        if (isNaN(hours)) {
            throw new Error(`All daily hour must be numbers`)
        }

        dailyHours.push(hours)
    }

    return {
        target,
        dailyHours
    }
}

export const calculateExercises = (dailyHours: number[], target: number) : Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(hours => hours > 0).length;
    const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0)
    const average = totalHours / periodLength;
    const success = average >= target;
    
    let rating: 1 | 2 | 3
    let ratingDescription: string;

    const percentage = (average / target) * 100

    if (percentage >= 100) {
        rating = 3;
        ratingDescription = "excellent, you reached your goal"
    } else if (percentage >= 75) {
        rating = 2;
        ratingDescription = "not too bad but could be better"
    } else {
        rating = 1;
        ratingDescription = "you need to work harder to reach your goal"
    }

    return{
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
  const { target, dailyHours } = parseArguments2(process.argv);
  const result = calculateExercises(dailyHours, target);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  
  console.log(errorMessage);
}


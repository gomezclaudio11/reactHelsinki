"use strict";
/*
const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText,  a * b);
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])
multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`);
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculator = void 0;
const parseArguments = (args) => {
    if (args.length < 4)
        throw new Error('Not enough arguments');
    if (args.length > 4)
        throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
};
const multiplicator = (a, b, printText) => {
    console.log(printText, a * b);
};
try {
    const { value1, value2 } = parseArguments(process.argv);
    multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
}
catch (error) { // ← Seguro, obliga a verificar tipo
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
const calculator = (a, b, op) => {
    switch (op) {
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0)
                throw new Error('Can\'t divide by 0!');
            return a / b;
        case 'add':
            return a + b;
        default:
            throw new Error('Operation is not multiply, add or divide!');
    }
};
exports.calculator = calculator;
try {
    console.log((0, exports.calculator)(4, 4, 'multiply'));
}
catch (error) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

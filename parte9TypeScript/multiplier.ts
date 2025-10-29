/*
const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText,  a * b);
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])
multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`);
*/

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText,  a * b);
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
} catch (error: unknown) { // ← Seguro, obliga a verificar tipo
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) { 
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

/**
 
Un programa que multiplica dos números recibidos como argumentos de línea de comandos,
 con validación estricta.
 Flujo:
1. Usuario ejecuta: npx tsx multiplier.ts 5 3
2. parseArguments valida cantidad y tipo
3. Si OK → multiplicator calcula 5 * 3 = 15
4. Si ERROR → catch muestra mensaje de error

 Validaciones:
Cantidad exacta - Debe tener exactamente 2 argumentos
Son números - Ambos deben ser numéricos válidos
Manejo de errores - Try-catch captura cualquier problema

TypeScript features:
Interface - Define estructura de datos
unknown - Tipo seguro para errores
Type guard - Verifica tipo con instanceof
Destructuring - Extrae values con { value1, value2 }
 */


/**
 *INTERFACE
 Define como debe verse un objeto
// EJEMPLO BÁSICO:
interface Persona {
  nombre: string;
  edad: number;
}

// Uso correcto ✅
const persona1: Persona = {
  nombre: "Ana",
  edad: 25
};

// ERROR ❌ - Falta 'edad'
const persona2: Persona = {
  nombre: "Carlos"
  // TypeScript error: Property 'edad' is missing
};

// ERROR ❌ - Tipo incorrecto
const persona3: Persona = {
  nombre: "Luis",
  edad: "25"  
};

// ========================================
// INTERFACE - MÁS EJEMPLOS
// ========================================

// Con propiedades opcionales
interface Usuario {
  id: number;
  nombre: string;
  email?: string;  // ← El '?' significa opcional
  activo?: boolean;
}

// Ambos son válidos ✅
const user1: Usuario = {
  id: 1,
  nombre: "Pedro"
};

const user2: Usuario = {
  id: 2,
  nombre: "María",
  email: "maria@example.com",
  activo: true
};

// Con métodos
interface Calculadora {
  sumar: (a: number, b: number) => number;
  restar: (a: number, b: number) => number;
}

const miCalc: Calculadora = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b
};

console.log(miCalc.sumar(5, 3));  // 8

// Con propiedades readonly (solo lectura)
interface Configuracion {
  readonly apiUrl: string;
  timeout: number;
}
 */

/**
 ***UNKNOWN
 "No sé qué es esto, debo verificarlo antes de usarlo"
 // COMPARACIÓN: any vs unknown

// CON 'any' (PELIGROSO ❌):
let valorAny: any = "hola";
valorAny.toUpperCase();  // OK
valorAny = 123;
valorAny.toUpperCase();  // ❌ ERROR en runtime (no en compilación)

// CON 'unknown' (SEGURO ✅):
let valorUnknown: unknown = "hola";
// valorUnknown.toUpperCase();  // ❌ ERROR: TypeScript no lo permite

// Debes verificar el tipo primero:
if (typeof valorUnknown === "string") {
  valorUnknown.toUpperCase();  // ✅ OK, TypeScript sabe que es string
}

// ========================================
// UNKNOWN - CASOS DE USO
// ========================================

// CASO 1: Datos de API externa
function procesarRespuesta(data: unknown) {
  // No sabemos qué nos llegó
  
  // Debemos verificar antes de usar
  if (typeof data === "object" && data !== null) {
    console.log("Es un objeto");
  } else if (typeof data === "string") {
    console.log("Es un string:", data.toUpperCase());
  } else if (typeof data === "number") {
    console.log("Es un número:", data * 2);
  }
}

// CASO 2: Try-catch 
try {
  // código que puede fallar
  throw new Error("Algo salió mal");
} catch (error: unknown) {
  // error es unknown porque puede ser cualquier cosa
  
  // ❌ NO puedes hacer directamente:
  // console.log(error.message);
  
  // ✅ Debes verificar primero:
  if (error instanceof Error) {
    console.log(error.message);  // Ahora sí
  } else {
    console.log("Error desconocido:", error);
  }
}

// CASO 3: Entrada de usuario
function procesarInput(input: unknown) {
  // El usuario puede escribir cualquier cosa
  
  if (typeof input === "string") {
    return input.trim().toLowerCase();
  } else if (typeof input === "number") {
    return input.toString();
  } else {
    return "Input inválido";
  }
}


/**TYPE GUARD */
/**
 // ¿QUÉ ES?
// Una forma de verificar tipos y decirle a TypeScript "confía en mí"

// TIPO 1: typeof (para primitivos)
function imprimirValor(valor: string | number) {
  if (typeof valor === "string") {
    // Dentro de este if, TypeScript SABE que es string
    console.log(valor.toUpperCase());
  } else {
    // Aquí TypeScript SABE que es number
    console.log(valor.toFixed(2));
  }
}

imprimirValor("hola");  // "HOLA"
imprimirValor(3.14159); // "3.14"

// TIPO 2: instanceof (para clases)
class Perro {
  ladrar() {
    console.log("Guau!");
  }
}

class Gato {
  maullar() {
    console.log("Miau!");
  }
}

function hacerSonido(animal: Perro | Gato) {
  if (animal instanceof Perro) {
    // TypeScript sabe que es Perro
    animal.ladrar();
  } else {
    // TypeScript sabe que es Gato
    animal.maullar();
  }
}

const miPerro = new Perro();
const miGato = new Gato();

hacerSonido(miPerro); // "Guau!"
hacerSonido(miGato);  // "Miau!"

// TIPO 3: 'in' operator (para objetos)
interface Coche {
  ruedas: number;
  conducir: () => void;
}

interface Barco {
  velas: number;
  navegar: () => void;
}

function moverVehiculo(vehiculo: Coche | Barco) {
  if ("conducir" in vehiculo) {
    // TypeScript sabe que es Coche
    vehiculo.conducir();
  } else {
    // TypeScript sabe que es Barco
    vehiculo.navegar();
  }
}
 */
 /*
 ========================================
 EJEMPLO PRÁCTICO: VALIDACIÓN DE FORMULARIO
========================================

interface FormularioRegistro {
  email: string;
  password: string;
  edad: number;
}

function validarFormulario(data: unknown): FormularioRegistro | string {
  //Verificar que sea objeto
  if (typeof data !== "object" || data === null) {
    return "Los datos deben ser un objeto";
  }
  
  const form = data as any;
  
  // Verificar email
  if (typeof form.email !== "string" || !form.email.includes("@")) {
    return "Email inválido";
  }
  
  // Verificar password
  if (typeof form.password !== "string" || form.password.length < 6) {
    return "Password debe tener al menos 6 caracteres";
  }
  
  // Verificar edad
  if (typeof form.edad !== "number" || form.edad < 18) {
    return "Debes ser mayor de 18 años";
  }
  
  // Todo OK, retornar datos validados
  return {
    email: form.email,
    password: form.password,
    edad: form.edad
  };
}

// Uso:
const input1 = { email: "user@test.com", password: "123456", edad: 25 };
const resultado1 = validarFormulario(input1);
console.log(resultado1); // { email: "user@test.com", ... }

const input2 = { email: "invalido", password: "123", edad: 15 };
const resultado2 = validarFormulario(input2);
console.log(resultado2); // "Email inválido"
*/

//********CALCULATOR */
type Operation = 'multiply' | 'add' | 'divide';


export const calculator = (a: number, b: number, op: Operation) : number => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':

      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    case 'add':
      return a + b;
    default:

      throw new Error('Operation is not multiply, add or divide!');
  }
}

try {
  console.log(calculator(4, 4, 'multiply'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
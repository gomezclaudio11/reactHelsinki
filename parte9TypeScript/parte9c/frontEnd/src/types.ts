export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
export const Weather = { // Un objeto para poder acceder como Weather.Sunny
  Sunny: 'sunny' as Weather,
  Rainy: 'rainy' as Weather,
  Cloudy: 'cloudy' as Weather,
  Stormy: 'stormy' as Weather,
  Windy: 'windy' as Weather,
};

export type Visibility = 'great' | 'good' | 'ok' | 'poor';
export const Visibility = {
  Great: 'great' as Visibility,
  Good: 'good' as Visibility,
  Ok: 'ok' as Visibility,
  Poor: 'poor' as Visibility,
};

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

/**
 La razón por la que tienes que definir los tipos (interfaces y enums) en el 
 frontend y en el backend, incluso si son casi idénticos, es una combinación 
 de cómo funciona la arquitectura de microservicios y las limitaciones de los 
 entornos de ejecución.

1. Aislamiento de Proyectos y Entornos de Ejecución
2. Dependencia Circular y Limpieza
Si pudieras compartir archivos directamente, se crearía una dependencia 
circular y se contaminarían los proyectos con tipos innecesarios.

3. La Solución: Creación de un Paquete de Tipos Compartidos (Monorepo)
En proyectos grandes, la solución profesional para evitar la duplicación de 
tipos (como DiaryEntry y los enums) es crear un tercer proyecto llamado 
@app/common o @app/types dentro de una estructura de Monorepo 
(como Lerna o Turborepo).

 */
import React from 'react';
import type { PartProps } from '../types/CoursesTypes';

/**
 * Función auxiliar para asegurar que el switch es exhaustivo.
 * Si TypeScript encuentra un tipo no manejado, esto causa un error de compilación.
 */
const assertNever = (value: never) : never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

// Utilizamos switch/case en el campo 'kind' para hacer Narrowing 
// (Verificación de Tipos)
const Part: React.FC<PartProps> = ({ part }) => {
    switch (part.kind) {
        case "basic":
            //typeScript sabe que part es CoursePartBasic
            return(
                <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
          <h3>{part.name} ({part.exerciseCount} ejercicios)</h3>
          <p>
            **Tipo:** Básico
          </p>
          <p>
            **Descripción:** *{part.description}*
          </p>
        </div>
            );
      case "group":
      return (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
          <h3>{part.name} ({part.exerciseCount} ejercicios)</h3>
          <p>
            **Tipo:** Proyecto en Grupo
          </p>
          <p>
            **Proyectos grupales:** {part.groupProjectCount}
          </p>
        </div>
      );    
        case "background":
        return(
                <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
          <h3>{part.name} ({part.exerciseCount} ejercicios)</h3>
          <p>
            **Tipo:** Material de Fondo
          </p>
          <p>
            **Descripción:** *{part.description}*
          </p>
          <p>
            **Material:** <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </p>
        </div>
        );
        case "special":
        return (
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#eef' }}>
          <h3>{part.name} ({part.exerciseCount} ejercicios)</h3>
          <p>
            **Tipo:** Especial
          </p>
          <p>
            **Descripción:** *{part.description}*
          </p>
          <p>
            **Requisitos:** {part.requirements.join(', ')}
          </p>
        </div>
  );
  default:
    return assertNever(part);
}
};

export default Part;
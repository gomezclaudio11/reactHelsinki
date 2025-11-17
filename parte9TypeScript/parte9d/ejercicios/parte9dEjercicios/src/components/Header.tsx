import React from 'react';
import type { HeaderProps } from '../types/CoursesTypes';

//React.FunctionComponent es una interfaz de TypeScript que se utiliza para 
//tipar una Función Componente de React.
//Esto crea un tipo que dice: "Esta es una función componente de React que 
//acepta las props definidas en HeaderProps".

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <h1>{name}</h1>
  );
};

export default Header;

import React from "react";
import type { ContentProps } from "../types/CoursesTypes";
import Part from "./Part";

const Content: React.FC<ContentProps> = ({ parts }) => {
    return (
        <div>
      {/* Mapeamos el array de partes para renderizar un componente Part por cada elemento */}
      {parts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
    );
}

export default Content;
import React from "react";
import type { TotalProps } from "../types/CoursesTypes";


const Total: React.FC<TotalProps> = ({ total }) => {
    return (
        <p style={{ fontWeight: 'bold' }}>
      Número total de ejercicios: {total}
    </p>
    );
}
export default Total;
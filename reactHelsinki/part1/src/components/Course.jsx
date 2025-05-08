const Titulo = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Course = ({course}) =>{

    return (
      <div>        
        <Titulo name={course.name }/>
        {
          course.parts.map(part => (
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          ))
        }
        <p> total of {    
        course.parts.reduce((sum, part) => sum + part.exercises, 0)
        } excercises</p>
        </div>
    )
  }

export default Course
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("https://www.hatchways.io/api/assessment/students")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setStudents(result.students);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {students.map(student => (

          <li key={student.id}>
            <img src={student.pic} alt="student"></img>
            <h3>{student.firstName}  {student.lastName}</h3>
            <p>Email: {student.email}</p>
            <p>Company: {student.company}</p>
            <p>Skill: {student.skill}</p>
            <div>Average: {(student.grades.reduce((a, b) => parseInt(b) + a, 0))
              / (student.grades.map((grade) => grade).length)}%
            </div>

          </li>
        ))
        }
      </ul >
    );

  }


}

export default App;

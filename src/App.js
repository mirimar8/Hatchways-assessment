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
      <div className="main-container">
        <ul>
          {students.map(student => (

            <li className="student-container" key={student.id}>
              <img src={student.pic} alt="student"></img>
              <div className="student-info">
                <h1>{student.firstName}  {student.lastName}</h1>
                <p>Email: {student.email}</p>
                <p>Company: {student.company}</p>
                <p>Skill: {student.skill}</p>
                <p>Average: {(student.grades.reduce((a, b) => parseInt(b) + a, 0))
                  / (student.grades.map((grade) => grade).length)}%
                </p>
              </div>
            </li>
          ))
          }
        </ul >
      </div>
    );

  }


}

export default App;

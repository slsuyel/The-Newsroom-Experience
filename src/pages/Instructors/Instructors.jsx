import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

const Instructors = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/addclass')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.log(error));
  }, []);



  return (
    <div className='container'>
      <h1>Instructors</h1>
      <Table striped>
        <thead>
          <tr>
            <th>Instructor Image</th>
            <th>Instructor Name</th>
            <th>Instructor Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((instructor, index) => (
            <tr key={index}>
              <td>
              <img
  src={instructor.photoURL || "https://www.svgrepo.com/show/500470/avatar.svg"}
  alt="Instructor"
  width={'90px'}
  height={'90px'}
  className='rounded-circle mt-3'
/>


              </td>
              <td>{instructor?.instructorName}</td>
              <td>{instructor?.instructorEmail}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Instructors;

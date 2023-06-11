import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

const Instructors = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://ass-12-server-eight.vercel.app/addclass')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='container'>
      <h1 className='border-2 border-bottom border-danger border-top col-md-4 mb-5 mx-auto py-2 text-center mt-5'>Instructors</h1>
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
  width={'40px'}
  height={'40px'}
  className='rounded-circle '
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

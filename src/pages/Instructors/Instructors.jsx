/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';
import { Fade, } from 'react-awesome-reveal';
const Instructors = ({ baseUrl }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/addclass`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, [baseUrl]);

  if (isLoading) {
    return (
      <div className="text-center mt-5"><Button variant="primary" disabled >
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button></div>
    );
  }

  return (
    <div className='container'>
      <Fade>
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
      </Fade>
    </div>
  );
};

export default Instructors;

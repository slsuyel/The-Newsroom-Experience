import { useState, useEffect, useContext } from 'react';
import { Flip } from 'react-awesome-reveal';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '../../../provider/AuthProviders';

const PopularInstructorsSection = () => {
  const [instructors, setInstructors] = useState([]);
  const { photo } = useContext(AuthContext)
  useEffect(() => {

    fetch('http://localhost:5000/addclass')
      .then((res) => res.json())
      .then((data) => {
        // Sort instructors by student count in descending order
        const sortedInstructors = data?.sort((a, b) => b.studentCount - a.studentCount);
        // Get the top 6 instructors
        const topInstructors = sortedInstructors.slice(0, 6);
        setInstructors(topInstructors);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }, []);

  return (
    <Container>
      <Flip>
        <h2 className='text-center my-4'>Popular Instructors</h2>
      </Flip>
      <Row>
        {instructors.map((instructor) => (
          <Col key={instructor._id} className='my-2' md={4} sm={6}>
            <Card className='card text-center'>

              <div className="align-items-center d-flex justify-content-between mx-4">
                <img src={photo || ''} width={'90px'} height={'90px'} className='rounded-circle  mt-3' alt="" />
                <div>
                  <Card.Title> Name : {instructor?.instructorName}</Card.Title>
                  <Card.Text>Enrolled Students: <span>{instructor?.studentCount || '00'}</span> </Card.Text>
                  <p>Email :{instructor?.instructorEmail} </p>
                </div>
              </div>
              <Card.Body>

                <Card.Text>Class Name: {instructor.className}</Card.Text>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularInstructorsSection;

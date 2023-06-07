import  { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const PopularInstructorsSection = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Fetch data from 'data.json'
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => {
        // Sort instructors by student count in descending order
        const sortedInstructors = data.sort((a, b) => b.studentCount - a.studentCount);
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
      <h2 className='text-center my-4'>Popular Instructors</h2>
      <Row>
        {instructors.map((instructor) => (
          <Col key={instructor.name} className='my-2' md={4} sm={6}>
            <Card>
              <Card.Img variant='top' src={instructor['Class image']} />
              <Card.Body>
                <Card.Title>{instructor['Instructor name']}</Card.Title>
                <Card.Text>Enrolled Students: {instructor.studentCount}</Card.Text>
                <Card.Text>Class Name: {instructor['Class name']}</Card.Text>
               
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularInstructorsSection;

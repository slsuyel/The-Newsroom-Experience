import { useState, useEffect } from 'react';
import { Flip } from 'react-awesome-reveal';
import { Container, Row, Col, Card } from 'react-bootstrap';

const PopularInstructorsSection = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch('https://ass-12-server-slsuyel.vercel.app/addclass')
      .then((res) => res.json())
      .then((data) => {
        const sortedInstructors = data?.sort((a, b) => b.studentCount - a.studentCount);
        // Get the top 6 instructors
        const topInstructors = sortedInstructors.slice(0, 6);
        setInstructors(topInstructors);
        // console.log('------ins', topInstructors);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }, []);



  return (
    <Container>
      <Flip>
        <h2 className='border-2 border-bottom border-danger border-top col-md-4 mb-5 mx-auto py-2 text-center mt-5'>Popular Instructors</h2>
      </Flip>
      <Row>
        {instructors.map((instructor) => (
          <Col key={instructor._id} className='my-2' md={4} sm={6}>
            <Card className='card text-center'>

              <div className="align-items-center d-flex justify-content-between mx-4">
                {/* <img src={instructor.photoURL } width={'90px'} height={'90px'} className='rounded-circle  mt-3' alt="" /> || */}
                {/* <FaUserCircle /> */}

                <img
                  src={instructor.photoURL || "https://www.svgrepo.com/show/500470/avatar.svg"}
                  alt="Instructor"
                  width={'90px'}
                  height={'90px'}
                  className='rounded-circle mt-3'
                />




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

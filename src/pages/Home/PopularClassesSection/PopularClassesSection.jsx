import { useState, useEffect } from 'react';
import { Fade, } from 'react-awesome-reveal';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
/* 200px */
const PopularClassesSection = () => {
    const [popularClasses, setPopularClasses] = useState([]);
    // http://localhost:5000/addclass
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/addclass');
                const data = await res.json();
                setPopularClasses(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const filteredClasses = popularClasses.sort((a, b) => b.availableSeats - a.availableSeats);

    return (
        <Container>
            <Fade>
                <h2 className='text-center my-4'>Popular Classes</h2>
            </Fade>
            <Row>
                {filteredClasses.slice(0, 6).map((classItem) => (
                    <Col key={classItem.className} className='my-2' md={4} sm={6}>
                        <Card className='shadow'>
                            <Card.Img variant="top" src={classItem.classImage} height={'200px'} />
                            <Card.Body>
                                <Card.Title>Instructors : {classItem.instructorName}</Card.Title>


                                <Card.Text>Class Name: {classItem.className}</Card.Text>

                                <Card.Text>Total Seats: {classItem.availableSeats}</Card.Text>
                                <Button variant="primary">Enroll now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PopularClassesSection;

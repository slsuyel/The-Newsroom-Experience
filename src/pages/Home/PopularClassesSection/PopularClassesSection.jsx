import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const PopularClassesSection = () => {
    const [popularClasses, setPopularClasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('data.json');
                const data = await response.json();
                setPopularClasses(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <h2 className='text-center my-4'>Popular Classes</h2>
            <Row>
                {popularClasses.map((classItem) => (
                    <Col key={classItem['Class name']} className='my-2' md={4} sm={6}>
                        <Card>
                            <Card.Img variant="top" src={classItem['Class image']} />
                            <Card.Body>
                                <Card.Title>{classItem['Class name']}</Card.Title>
                                <Card.Text>Enrolled Students: {classItem.studentCount}</Card.Text>
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

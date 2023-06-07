import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Classes = () => {
    const [classesData, setClassesData] = useState([]);

    useEffect(() => {
        fetch('data.json')
            .then(response => response.json())
            .then(jsonData => setClassesData(jsonData))
            .catch(error => console.log(error));
    }, []);

    const handleSelectClass = (classData) => {
        if (!isLoggedIn()) {
            alert('Please log in before selecting the course.');
            return;
        }

        if (classData['Available seats'] === 0) {
            alert('This class is currently full.');
            return;
        }

        // Handle the class selection logic here
        console.log('Selected class:', classData);
    };

    const isLoggedIn = () => {
        // Replace this with your own authentication logic
        // Example: return true if the user is logged in, false otherwise
        return false;
    };

    return (
        <div>
            <h1>Classes</h1>
            <Row>
                {classesData.map((classData, index) => (
                    <Col md={4} key={index}>
                        <Card
                            className={`class-card ${classData['Available seats'] === 0 ? 'class-full' : ''}`}
                        >
                            <Card.Img variant="top" src={classData['Class image']} alt="Class" />
                            <Card.Body>
                                <Card.Title>{classData['Class name']}</Card.Title>
                                <Card.Text>
                                    Instructor: {classData['Instructor name']}
                                    <br />
                                    Available Seats: {classData['Available seats']}
                                    <br />
                                    Price: {classData['Price']}
                                </Card.Text>
                                <Button
                                    onClick={() => handleSelectClass(classData)}
                                    disabled={
                                        classData['Available seats'] === 0 ||
                                        isLoggedIn() ||
                                        classData['Logged in as admin/instructor']
                                    }
                                >
                                    Enroll Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Classes;

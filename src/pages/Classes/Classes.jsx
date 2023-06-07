import { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthContext } from '../../provider/AuthProviders';
import { useNavigate } from 'react-router-dom';

const Classes = () => {
    const [classesData, setClassesData] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedClasses, setSelectedClasses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(response => response.json())
            .then(jsonData => setClassesData(jsonData))
            .catch(error => console.log(error));
    }, []);

    const handleSelectClass = (classData) => {
        if (classData['Available seats'] === 0) {
            alert('This class is currently full.');
            return;
        }

        if (user) {
            if (selectedClasses.some(selectedClass => selectedClass._id === classData._id)) {
                alert('Already selected this class.');
            } else {
                setSelectedClasses(prevSelectedClasses => [...prevSelectedClasses, classData]);
                alert('Selected');
                // Handle the class selection logic here
                console.log('Selected class:', classData);
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <div className='container'>
            <h1>Classes</h1>
            <Row>
                {classesData.map((classInfo) => (
                    <Col md={4} key={classInfo._id}>
                        <Card
                            className={`class-card ${classInfo['Available seats'] === 0 ? 'class-full' : ''}`}
                        >
                            <Card.Img variant='top' src={classInfo['Class image']} alt='Class' />
                            <Card.Body>
                                <Card.Title>{classInfo['Class name']}</Card.Title>
                                <Card.Text>
                                    Instructor: {classInfo['Instructor name']}
                                    <br />
                                    Available Seats: {classInfo['Available seats']}
                                    <br />
                                    Price: {classInfo['Price']}
                                </Card.Text>
                                <Button
                                    onClick={() => handleSelectClass(classInfo)}
                                    disabled={
                                        classInfo['Available seats'] === 0 ||
                                        classInfo['Logged in as admin/instructor'] ||
                                        selectedClasses.some(selectedClass => selectedClass._id === classInfo._id)
                                    }
                                >
                                    {selectedClasses.some(selectedClass => selectedClass._id === classInfo._id) ? 'Selected' : 'Select'}
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

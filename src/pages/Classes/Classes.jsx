import { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthContext } from '../../provider/AuthProviders';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Classes = () => {
    const [classesData, setClassesData] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(response => response.json())
            .then(jsonData => setClassesData(jsonData))
            .catch(error => console.log(error));
    }, []);

    const handleSelectClass = (classData) => {
        if (user && user?.email) {
            const selectedClass = {
                email: user.email,
                selectedId: classData._id,
                className: classData["Class name"],
                instructorName: classData["Instructor name"],
                availableSeats: classData["Available seats"],
                price: classData.Price
            };
            // console.log(selectedClass);
            fetch('http://localhost:5000/selectedClasses', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(selectedClass)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'You Selected the class successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
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
                        <Card>
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
                                >
                                    Select
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

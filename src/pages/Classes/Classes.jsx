import { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AuthContext } from '../../provider/AuthProviders';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseUserRole from '../hooks/UseUserRole/UseUserRole';
import { Spinner } from 'react-bootstrap';

const Classes = () => {
    const [classesData, setClassesData] = useState([]);
    const { user } = useContext(AuthContext);
    const [userRole, isUserRoleLoading] = UseUserRole()
    // console.log(userRole);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://ass-12-server-eight.vercel.app/addclass')
            .then(res => res.json())
            .then(data => setClassesData(data))
            .catch(error => console.log(error));
    }, []);
    const handleSelectClass = (classData) => {
        if (user && user?.email) {
            const selectedClass = {
                email: user.email,
                selectedId: classData._id,
                className: classData.className,
                instructorName: classData.instructorName,
                availableSeats: classData.availableSeats,
                price: classData.price
            };
            // console.log(selectedClass);
            fetch('https://ass-12-server-eight.vercel.app/selectedClasses', {
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

    if (user && isUserRoleLoading) {
        return <div className="text-center mt-5"><Button variant="primary" disabled >
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </Button></div>
    }

    return (
        <div className='container'>
            <h1 className='border-2 border-bottom border-danger border-top col-md-4 mb-5 mx-auto py-2 text-center mt-5'>Classes</h1>

            <Row>
                {classesData.map((classInfo) => (
                    <Col md={4} key={classInfo._id}>
                        <Card className='my-2'>
                            <Card.Img variant='top' src={classInfo.classImage} alt='Class' height={'200px'} />
                            <Card.Body>
                                <Card.Title>{classInfo.className}</Card.Title>
                                <Card.Text>
                                    Instructor: {classInfo.instructorName}
                                    <br />
                                    Available Seats: {classInfo.availableSeats}
                                    <br />
                                    Price: {classInfo.price}
                                </Card.Text>
                                <Button disabled={userRole === 'admin' || userRole === 'instructor'} onClick={() => handleSelectClass(classInfo)}> Select   </Button>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Classes;

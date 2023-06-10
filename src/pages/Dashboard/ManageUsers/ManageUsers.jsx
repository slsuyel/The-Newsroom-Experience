import { useState, useEffect } from 'react';
import { Table, Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const makeAdmin = (id) => {
        const role = "admin";
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ role })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    fetchUsers();
                    Swal.fire(
                        'Good!',
                        'Name is admin now!',
                        'success'
                    );
                }
            });
    };

    const makeInstructor = (userId) => {
        const role = "instructor";
        fetch(`http://localhost:5000/users/${userId}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ role })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    fetchUsers();
                    Swal.fire(
                        'Good!',
                        'Name is instructor now!',
                        'success'
                    );
                }
            });
    };


    return (
        <Container>
            <Row>
                <Col>
                    <Table striped bordered responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user?.role}</td>
                                    <td>
                                        <ButtonGroup className='gap-2'>
                                            <Button onClick={() => makeAdmin(user._id)}>Make Admin</Button>
                                            <Button onClick={() => makeInstructor(user._id)}>Make Instructor</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default ManageUsers;

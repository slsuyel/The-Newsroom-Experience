import { useState, useEffect } from 'react';
import { Table, Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("access-token");
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://ass-12-server-eight.vercel.app/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const updateUserRole = (user, role) => {
        fetch(`https://ass-12-server-eight.vercel.app/users/${user._id}`, {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ role })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    fetchData();
                    Swal.fire(
                        'Good!',
                        `${user?.name} is ${role} now!`,
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
                                            <Button
                                                onClick={() => updateUserRole(user, 'admin')}
                                                disabled={user?.role === 'admin'}
                                            >
                                                Make Admin
                                            </Button>
                                            <Button
                                                onClick={() => updateUserRole(user, 'instructor')}
                                                disabled={user?.role === 'instructor'}
                                            >
                                                Make Instructor
                                            </Button>
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
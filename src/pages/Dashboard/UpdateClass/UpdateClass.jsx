import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useAddClass from "../../hooks/useAddClass/useAddClass";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateClass = () => {
    const { id } = useParams();
    const [addclass] = useAddClass();
    const classItem = addclass.find((item) => item._id === id);

    const [className, setClassName] = useState(classItem?.className);
    const [price, setPrice] = useState(classItem?.price);
    const [availableSeats, setAvailableSeats] = useState(
        classItem?.availableSeats
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`https://ass-12-server-eight.vercel.app/classupdate/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                className,
                price,
                availableSeats,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire(
                        'Good!',
                        'Class Update successfull',
                        'success'
                    );
                }



            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="Class">
                    <Form.Label>Class Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Class Name"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Availableseats">
                    <Form.Label>Available Seats</Form.Label>
                    <Form.Control
                        type="number"
                        value={availableSeats}
                        onChange={(e) => setAvailableSeats(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default UpdateClass;
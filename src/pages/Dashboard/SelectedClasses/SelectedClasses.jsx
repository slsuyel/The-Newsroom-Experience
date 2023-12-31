
import { Button, Spinner, Table } from "react-bootstrap";
import UseSelectClass from "../../hooks/UseSelectClass/UseSelectClass";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { baseUrl } from '../../../baseUrl/baseUrl'
const SelectedClasses = () => {
    const [selectedClass, refetch, isLoading] = UseSelectClass();
    const token = localStorage.getItem("access-token")

    if (isLoading) {
        return (
            <div className="text-center mt-5"><Button variant="primary" disabled >
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading...
            </Button></div>
        );
    }

    const handleDeleteClass = classItem => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${baseUrl}/selectedClasses/${classItem._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },

                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div>
            <h2 className="text-center">
                My Selected Classes {selectedClass?.length}

            </h2>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class Name</th>
                        <th>Instructor Name</th>
                        <th>Price</th>
                        <th>Enrollment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedClass?.map((classItem, index) => (
                        <tr key={classItem._id}>
                            <td>{index + 1}</td>
                            <td>{classItem.className}</td>
                            <td>{classItem.instructorName}</td>
                            <td>{classItem.price}</td>
                            <td>
                                <Link to={`/dashboard/payment/${classItem._id}`}><button className="btn btn-primary">Pay Now</button></Link>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteClass(classItem)} className="btn btn-danger">
                                    <FaTrashAlt /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default SelectedClasses;

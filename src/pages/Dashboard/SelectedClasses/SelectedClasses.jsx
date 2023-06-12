
import { Table } from "react-bootstrap";
import UseSelectClass from "../../hooks/UseSelectClass/UseSelectClass";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SelectedClasses = () => {
    const [selectedClass, refetch] = UseSelectClass();

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
                fetch(`https://ass-12-server-eight.vercel.app/selectedClasses/${classItem._id}`, {
                    method: 'DELETE'
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
                    {selectedClass.map((classItem, index) => (
                        <tr key={classItem._id}>
                            <td>{index + 1}</td>
                            <td>{classItem.className}</td>
                            <td>{classItem.instructorName}</td>
                            <td>{classItem.price}</td>
                            <td>
                                <Link to='/dashboard/payment'><button className="btn btn-primary">Pay button</button></Link>
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

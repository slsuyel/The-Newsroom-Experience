import { Button, Spinner, Table } from "react-bootstrap";
import useAddClass from "../../hooks/useAddClass/useAddClass";
import { Link } from "react-router-dom";

const MyClassInstructure = () => {
    // eslint-disable-next-line no-unused-vars
    const [addclass, refetch, isLoading] = useAddClass()
    if (isLoading) {
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
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Class Name</th>
                        <th>Available Seats</th>
                        <th>Total Enrolled</th>
                        <th>Status</th>
                        <th>Admin Feedback</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        addclass.map((classItem) => (
                            <tr key={classItem._id}>
                                <td>{classItem.className}</td>
                                <td>{classItem.availableSeats || 0}</td>
                                <td>{classItem?.totalEnroll || 0}</td>
                                <td>{classItem?.status}</td>
                                <td>
                                    {
                                        classItem?.status === "denied" ? classItem?.feedback : ''
                                    }
                                </td>
                                <td>
                                    <Link to={`/dashboard/classupdate/${classItem._id}`}><button  className="btn-primary btn">Update class</button></Link>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </Table>


        </div>
    );
};

export default MyClassInstructure;

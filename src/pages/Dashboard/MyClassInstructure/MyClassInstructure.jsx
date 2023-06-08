import { Table } from "react-bootstrap";
import useAddClass from "../../hooks/useAddClass/useAddClass";

const MyClassInstructure = () => {
    // eslint-disable-next-line no-unused-vars
    const [addclass, refetch, isLoading] = useAddClass()
    console.log(addclass);
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
                                <td>{classItem?.totalenrolled || 0}</td>
                                <td>{classItem?.status}</td>
                                <td>{classItem?.feedback || 'No Feedback'}</td>
                                <td>
                                    <button className="btn-primary btn">Update class</button>
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
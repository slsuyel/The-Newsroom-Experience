
import { Button, Spinner, Table } from "react-bootstrap";
import useClassAll from "../../hooks/useClassAll/useClassAll";
import { FaCheckCircle, FaCommentDots, FaTrashAlt } from 'react-icons/fa';
import Swal from "sweetalert2";

const ManageClassesAdmin = () => {
    // eslint-disable-next-line no-unused-vars
    const [allClass, refetch, isLoading] = useClassAll()
    // console.log(allClass);
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

    /* Delete */
    const handleDeleteClass = item => {
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
                fetch(`http://localhost:5000/addclass/${item._id}`, {
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
        <div >
            <h3 className="text-center">Total Classes : {allClass?.length} </h3>
            {/*  <Table striped bordered hover >
                <thead className="font-monospace">
                    <tr>
                        <th>Ins. Name</th>
                        <th>Class Image</th>
                        <th>Class Name</th>
                        <th> Ins. email</th>
                        <th> Seats</th>
                        <th> Price</th>
                        <th> Status</th>
                        <th> Approve</th>
                        <th> Deny </th>
                        <th> Feedback</th>
                    </tr>
                </thead>
                <tbody >

                    {
                        allClass.map((item) => <tr key={item._id}>
                            <td>{item.instructorName}</td>
                            <td>
                                <img src={item.classImage} alt="" width={'50px'} />
                            </td>
                            <td>{item.className}</td>
                            <td>{item.instructorEmail}</td>
                            <td>{item.availableSeats}</td>
                            <td>{item.price}</td>
                            <td>{item.status}</td>
                            <td className="text-center"> <button className="btn rounded-2 text-bg-success"><FaCheckCircle /> </button></td>
                            <td> <button className="btn btn-danger"><FaTrashAlt /></button> </td>
                            <td className="text-center"> <button className="btn btn-primary"><FaCommentDots /></button> </td>

                        </tr>)
                    }



                </tbody>
            </Table> */}
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead className="font-monospace">
                        <tr>
                            <th>Name</th>
                            <th> Image</th>
                            <th>Class Name</th>
                            <th>Ins. email</th>
                            <th>Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Approve</th>
                            <th>Deny</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allClass.map((item) => (
                            <tr key={item._id}>
                                <td className="text-nowrap">{item.instructorName}</td>
                                <td>
                                    <img src={item.classImage} alt="" width={'50px'} />
                                </td>
                                <td>{item.className}</td>
                                <td>{item.instructorEmail}</td>
                                <td>{item.availableSeats}</td>
                                <td>$ {item.price}</td>
                                <td>{item.status}</td>
                                <td className="text-center">
                                    <button className="btn rounded-2 text-bg-success">
                                        <FaCheckCircle />
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteClass(item)} className="btn btn-danger">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                                <td className="text-center">
                                    <button className="btn btn-primary">
                                        <FaCommentDots />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

        </div>
    );
};

export default ManageClassesAdmin;
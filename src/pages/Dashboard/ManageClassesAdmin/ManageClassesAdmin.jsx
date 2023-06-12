
// export default ManageClassesAdmin; 
import { useState } from "react";
import { Button, Spinner, Table, Modal } from "react-bootstrap";
import useClassAll from "../../hooks/useClassAll/useClassAll";
import { FaCheckCircle, FaCommentDots, FaBan } from 'react-icons/fa';
import Swal from "sweetalert2";

const ManageClassesAdmin = () => {


  /*  */


  const [allClass, refetch, isLoading] = useClassAll();
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [feedback, setFeedback] = useState(""); // State to store the feedback text
  const [selectedClassId, setSelectedClassId] = useState("");
  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Button variant="primary" disabled>
          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
          Loading...
        </Button>
      </div>
    );
  }

  const handleApprovedClass = (id) => {

    fetch(`https://ass-12-server-eight.vercel.app/addclass/${id}`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "approved" })
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire(
            'Good!',
            'You approved the class!',
            'success'
          );
        }
      });

  };

  const handleDenyBtn = (id) => {
    fetch(`https://ass-12-server-eight.vercel.app/addclass/${id}`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "denied" })
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire(
            'Opps!',
            'You denied the class!',
            'error'
          );
        }
      });
  };

  const handleSendFeedback = (id) => {
    setSelectedClassId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFeedback("");
  };

  const handleSubmitFeedback = () => {
    fetch(`https://ass-12-server-eight.vercel.app/addClass/${selectedClassId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire('Feedback Sent!', 'You have sent feedback for the class.', 'success');
          setShowModal(false);
          setFeedback('');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h3 className="text-center">Total Classes: {allClass?.length}</h3>
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
                  {/* any btn will clicked , 2 btn will be disable*/}
                  <button onClick={() => handleApprovedClass(item._id)}

                    className="btn rounded-2 text-bg-success">
                    <FaCheckCircle />
                  </button>
                </td>
                <td>

                  <button onClick={() => handleDenyBtn(item._id)}
                    className="btn btn-danger"

                  >
                    <FaBan />
                  </button>
                </td>
                <td className="text-center">
                  <button onClick={() => handleSendFeedback(item._id)} className="btn btn-primary">
                    <FaCommentDots />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Send Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback"
            rows={4}
            className="form-control"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitFeedback}>
            Submit Feedback
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageClassesAdmin;

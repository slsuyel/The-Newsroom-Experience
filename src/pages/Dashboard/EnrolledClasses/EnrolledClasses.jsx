import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../provider/AuthProviders";

function EnrolledClasses() {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      handleGetPayments();
    }
  }, [user]);

  const handleGetPayments = async () => {
    try {
      const response = await fetch(`https://ass-12-server-eight.vercel.app/payments?email=${user?.email}`);
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
      } else {
        console.error("Error retrieving payments:", response.status);
      }
    } catch (error) {
      console.error("Error retrieving payments:", error);
    }
  };

  return (
    <div>
      <h1>Payment history</h1>
      <div>
        <h2>Payments:</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Price</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment?.classNames}</td>
                <td>{payment?.instructorName}</td>
                <td>{payment?.price}</td>
                <td>{new Date(payment?.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default EnrolledClasses;
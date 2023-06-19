import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../provider/AuthProviders";

function EnrolledClasses() {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const token = localStorage.getItem("access-token");
  useEffect(() => {
    if (user?.email) {
      handleGetPayments();
    }
  }, []);

  const handleGetPayments = async () => {
    try {
      const response = await fetch(`https://ass-12-server-eight.vercel.app/payments?email=${user?.email}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
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
      <h1 className="text-center">Enrolled Classes</h1>
      <div>
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
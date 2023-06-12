import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../provider/AuthProviders";

function PaymentList() {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      handleGetPayments();
    }
  }, [user]);

  const handleGetPayments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/payments?email=${user?.email}`);
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
        
              <th>Price</th>
           
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.classNames}</td>
              
                <td>{payment.price}</td>
             
                <td>{payment.transactionId}</td>
                <td>{new Date(payment.date).toLocaleString()}</td>

                <td>{payment.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentList;

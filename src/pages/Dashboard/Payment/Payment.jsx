import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFrom from "./CheckoutFrom";
import { useParams } from "react-router-dom";
import UseSelectClass from "../../hooks/UseSelectClass/UseSelectClass";

const Payment = () => {
    const { id } = useParams();
    // console.log(id);
    const [selectedClass,] = UseSelectClass()
    // console.log(selectedClass);

    // const price = selectedClass.find(item => item._id === id)?.price;
    const classItem = selectedClass.find(item => item._id === id);
    //  console.log(classItem)

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

    return (
        <div>
            <h2 className="text-center">Payment now</h2>
            <Elements stripe={stripePromise}>
                <CheckoutFrom classItem={classItem} />
            </Elements>
        </div>
    );
};

export default Payment;
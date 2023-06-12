import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFrom from "./CheckoutFrom";

const Payment = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

    return (
        <div>
            <h2 className="text-center">Payment now</h2>
            <Elements stripe={stripePromise}>
                <CheckoutFrom />
            </Elements>
        </div>
    );
};

export default Payment;
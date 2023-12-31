/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProviders";
import './checkout.css'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutFrom = ({ classItem }) => {
    //  console.log('classItem', classItem?.totalEnroll);
    const token = localStorage.getItem("access-token")
    const navigate = useNavigate()
    const price = classItem?.price
    const { user } = useContext(AuthContext)
    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://ass-12-server-eight.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    // console.log(clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        // console.log(card);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log('error', error)
            setCardError(error.message);
        }
        else {
            setCardError('');
            // console.log('payment method', paymentMethod)
        }

        setProcessing(true)



        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }
        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            const payment = {
                classNames: classItem?.className,
                instructorName: classItem?.instructorName,
                classId: classItem._id,
                availableSeats: parseInt(classItem?.availableSeats),
                totalEnroll : parseInt(classItem?.totalEnroll || 0),
                price,
                main_id: classItem.selectedId,
                email: user?.email,
                transactionId: paymentIntent.id,
                date: new Date(),
                orderStatus: 'Order pending',
            };

            fetch('https://ass-12-server-eight.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payment),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data.insertResult.insertedId) {
                        Swal.fire({
                            icon: 'success',
                            text: "Your payment was successful!"
                        });
                        setTimeout(function () {
                            navigate('/dashboard/enrolledclasses')
                        }, 3000);
                    }
                });
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="mx-3">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary m-3" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-center text-danger"> {cardError}</p>
            {transactionId && <p className="text-primary text-center">Transaction complete with transactionId: {transactionId}</p>}
        </div>
    );
};

export default CheckoutFrom;
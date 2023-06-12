/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutFrom = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setCardError] = useState('');


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
            console.log('error', error)
            setCardError(error.message);
        }
        else {
            setCardError('');
            console.log('payment method', paymentMethod)
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
                <button className="btn btn-primary m-3" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            <p className="text-center text-danger"> {cardError}</p>
        </div>
    );
};

export default CheckoutFrom;
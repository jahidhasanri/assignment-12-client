import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UseCard from '../UseCard';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [cards,refetch] = UseCard();
    const [transactionId, setTransactionId] = useState('');
    const { user } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate= useNavigate();

    // Calculate total price
    const totalPrice = cards.reduce((total, item) => total + item.price, 0);
    console.log(cards);

    useEffect(() => {
        if (totalPrice > 0) {
            axios.post('http://localhost:5000/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error('Error fetching payment intent:', err);
                });
        }
    }, [totalPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (cardElement == null) {
            return;
        }

        // Create payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('Payment error:', error.message);
            setError(error.message);
            return;
        } else {
            setError('');
            console.log('Payment method created:', paymentMethod);
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    email: user?.email || 'unknown',
                    name: user?.displayName || 'Anonymous',
                },
            },
        });

        if (confirmError) {
            console.log('Payment confirmation error:', confirmError.message);
            setError(confirmError.message);
        } else {
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                // Save payment to the database
                const payment = {
                    email: user?.email,
                    itemName:cards.map(item => item.name),
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date().toISOString(),
                    cartId: cards.map(item => item._id),
                    itemId: cards.map(item => item.itemId),
                    sellerEmail: cards.map(item => item.seller),
                   
                    status: 'pending',
                };

                const res = await axios.post('http://localhost:5000/payment', payment);
                if(res?.data?.result?.insertedId){
                    toast.success('taka paisi')
                    navigate('/invoice')
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }}
            />
            <button className="btn btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay ${totalPrice}
            </button>
            {error && <p className="text-red-400">{error}</p>}
            {transactionId && <p className="text-green-400">Your Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckOutForm;

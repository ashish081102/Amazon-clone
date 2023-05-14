import CheckoutProduct from './CheckoutProduct';
import { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import classes from './Payment.module.css'
import { useStateValue } from './StateProvider'
import { Link, useNavigate } from 'react-router-dom'
import { getBasketTotal } from './reducer'
import axios from './axios'
import { db } from './firebase'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
const Payment = () => {
    const navigate = useNavigate()
    const [{ basket, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const [error, setError] = useState(null);
    const [disable, setDisable] = useState(true);
    const [processing, setProcessing] = useState();
    const [succeeded, setSucceeded] = useState();
    const [clientSecret, setClientSecret] = useState();
    const elements = useElements();
    useEffect(() => {
        //    generates the special stripe secret which allows us to chrge a customer 
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // stripe expects a total in a currency sub unit 
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])
    console.log("client secret>>", clientSecret)
    const submitHandler = async (event) => {
        event.preventDefault();
        setProcessing(true);
        const payload = stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            console.log(paymentIntent)
            db
                .collection('users')//we are going in to the users 
                .doc(user?.uid)//Going to that particular user 
                .collection('orders')//going into that users order
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created

                })
            setSucceeded(true);
            setProcessing(false);
            setError(null);
            navigate('/orders', { replace: true })
        })
    }
    const changeHandler = (event) => {
        setDisable(event.empty);
        setError(event.error ? event.error.message : '');
    }
    return (
        <div className={classes.payment}>
            <div className={classes.payment__container}>
                <h1>Checkout <Link to="/checkout">({basket?.length} Items)</Link></h1>
                <div className={classes.payment__section} >
                    <div className={classes.payment__title}>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className={classes.payment__address}>
                        <p>{user.email}</p>
                        <p>123 React Lane</p>
                        <p>Bangalore,KT</p>
                    </div>
                </div>
                <div className={classes.payment__section} >
                    <div className={classes.payment__title}>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className={classes.payment__items}>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className={classes.payment__section} >
                    <div className={classes.payment__title}>
                        <h3>Payment Method</h3>
                    </div>
                    <div className={classes.payment__details}>
                        <form onClick={submitHandler}>
                            <CardElement onClick={changeHandler} />

                            <div className={classes.payment__priceContainer}>
                                <CurrencyFormat renderText={(value) => (
                                    <h1>Order total: {value}</h1>
                                )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'₹'}
                                />
                                <button disabled={processing || disable || succeeded}><span>{processing ? "Processing" : "Buy Now"}</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Payment
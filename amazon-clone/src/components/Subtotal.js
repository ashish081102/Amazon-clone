import classes from './Checkout.module.css'
import CurrencyFormat from 'react-currency-format'
import { Navigate, useNavigate } from 'react-router-dom'
import { Fragment } from 'react'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer'
const Subtotal = () => {
    const navigate = useNavigate();
    const [{ basket, user }, dispatch] = useStateValue();
    const totalItem = basket?.length;
    const prceeedHandler = () => {
        if (user.email) {
            navigate('/payment');
        } else {
            navigate('/login');
        }
    }
    return (
        <Fragment>
            <CurrencyFormat renderText={(value) => (
                <Fragment>
                    <div className={classes.checkout__rightInfo}>
                        <p>Subtotal ({totalItem} items):</p><strong>{value}</strong>
                    </div>

                    <label>
                        <input type="checkbox" />This order contians a gift</label>
                    <button onClick={prceeedHandler}>Proceed to Checkout</button>
                </Fragment>
            )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'₹'}
            />
        </Fragment>
    )
}
export default Subtotal
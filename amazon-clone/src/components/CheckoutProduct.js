import classes from './CheckoutProduct.module.css'
import StarIcon from '@mui/icons-material/Star';
import { useStateValue } from './StateProvider'
const CheckoutProduct = ({ id, image, price, title, rating, hideButton }) => {
    const [{ basket }, dispatch] = useStateValue();
    const removeItemFromBasket = () => {
        dispatch({
            type: "REMOVE_ITEM",

            id: id

        })
    }
    return (
        <div className={classes.checkoutproduct}>
            <img src={image} />
            <div className={classes.checkoutproduct__Info}>
                <h3>{title}</h3>
                <p><small>₹</small><strong>{price}</strong></p>
                <p>{Array(rating).fill().map((_, i) => (<StarIcon className={classes.checkoutproduct__startIcon} />))}</p>
                {!hideButton && <button onClick={removeItemFromBasket}>Remove from basket</button>}
            </div>
        </div>
    )
}
export default CheckoutProduct
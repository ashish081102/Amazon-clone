import classes from "./Product.module.css";
import StarIcon from '@mui/icons-material/Star';
import { useStateValue } from "./StateProvider";

const Product = ({ id, title, price, image, rating }) => {
    const [state, dispatch] = useStateValue({});
    const addToBasket = () => {
        // dispatch some action(add item) into the data layer 
        dispatch(
            {
                type: 'ADD_TO_BASKET',
                item: {
                    id: id,
                    title: title,
                    image: image,
                    price: price,
                    rating: rating,
                }
            }
        )
    }
    return (
        <div className={classes.product} key={id}>
            <div className={classes.product__info}>
                <div className={classes.product__title}>
                    {title}
                </div>
                <div className={classes.product__price}>
                    <small>₹</small><strong>{price}</strong>
                </div>
                <div className={classes.product__rating}>
                    {Array(rating).fill().map((_, i) => (<p><StarIcon className={classes.product__startIcon} /></p>))}
                </div>
            </div>
            <img className={classes.product__image} src={image} />
            <button className={classes.product__button} onClick={addToBasket}>Add to Cart</button>
        </div>
    );
};
export default Product;

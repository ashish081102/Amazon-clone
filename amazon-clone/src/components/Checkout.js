import classes from './Checkout.module.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
// import { useStateValue } from "./StateProvider";
import Subtotal from './Subtotal'
const Checkout = () => {
    const [{ basket }, dispatch] = useStateValue();
    return (
        <div className={classes.checkout}>
            <div className={classes.chekcout__left} >
                <img
                    className={classes.checkout__ad}
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt=""
                />
                <div >
                    <h2 className={classes.chechout__title}>
                        Your shopping basket
                    </h2>
                    {basket.map((item) => (

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
            <div className={classes.checkout__right}>
                <Subtotal />
            </div>
        </div>
    )
}
export default Checkout
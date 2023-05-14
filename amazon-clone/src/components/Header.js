import classes from './Header.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStateValue } from './StateProvider';
import { auth } from './firebase'
function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    const authanticationHandler = () => {
        if (user) {
            auth.signOut();
        }
    }
    return (
        <div className={classes.header}>
            <Link to="/">
                <img className={classes.header__logo} src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
            </Link>
            <div className={classes.header__search}>
                <input className={classes.header__searchInput} type="text" />
                <SearchIcon className={classes.header__searchIcon} fontSize="large" />
            </div>
            <div className={classes.header__nav}>
                <Link to={!user && '/login'} className={classes.link}>

                    <div className={classes.header__option} onClick={authanticationHandler}>
                        <span className={classes.header__optionLineOne} >
                            Hello {!user ? "Guest" : user.email}
                        </span>
                        <span className={classes.header__optionLineTwo} >
                            {user ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>
                <div className={classes.header__option}>
                    <span className={classes.header__optionLineOne} >
                        Returns
                    </span>
                    <span className={classes.header__optionLineTwo} >
                        & Order
                    </span>
                </div>
                <div className={classes.header__option}>
                    <span className={classes.header__optionLineOne} >
                        Your
                    </span>
                    <span className={classes.header__optionLineTwo} >
                        Prime
                    </span>
                </div>
                <Link to="/checkout">

                    <div className={classes.header__optionBasket}>

                        < ShoppingCartIcon fontSize='large' />

                        <span className={classes['header__optionLineTwo', 'header__basketCount']} >
                            {basket?.length}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
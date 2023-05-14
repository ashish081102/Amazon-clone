import { auth } from './firebase.js'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './Login.module.css'
const Login = () => {
    const navigate = useNavigate();
    const [emailVal, setEmailVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');

    const emailInputHandler = (event) => {
        setEmailVal(event.target.value);
    }
    const passwordInputHandler = (event) => {
        setPasswordVal(event.target.value);
    }
    const signIn = e => {
        // e.preventDefault();

        console.log(emailVal)
        console.log(passwordVal)
        auth
            .signInWithEmailAndPassword(emailVal, passwordVal)
            .then(auth => {
                navigate('/');
            })
            .catch(error => alert(error.message))
    }
    const registerHandler = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(emailVal, passwordVal).then((auth) => {
            if (auth) {
                navigate('/')
            }

        }).catch(error => alert(error.message))
    }
    return (
        <div className={classes.login__outercontainer}>
            <div className={classes.login__innercontainer}>
                <Link to='/' className={classes.link}>
                    <img className={classes.login__logo} src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' />
                </Link>
                <div className={classes.singIn}>
                    <div className={classes.singIn__form}>
                        <h2 className={classes.singIn__formTitle}>Sign In</h2>
                        <label id='email__Input'>E-mail</label>
                        <input type="email" value={emailVal} onChange={emailInputHandler} className={classes.singIn__forminput} id="email__Input" />
                        <label id='password__Input' value={passwordVal} >Password</label>
                        <input type="password" className={classes.singIn__forminput} id="passsword__Input" onChange={passwordInputHandler} />
                        <button onClick={signIn} className={classes.login__signInButton}>Sign In</button>
                        <p>By siging-in you agree to Amazon's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our interest-Based Ads Notice."</p>
                        <button className={classes.login__registerButton} onClick={registerHandler}>Create your Amazon Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login 
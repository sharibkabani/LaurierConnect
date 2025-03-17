import styles from './LoginPopUp.module.css'

export default function LoginPopUp(){

    return(
        <div className={styles.signInUpContainer}>
            <ul className={styles.signInContainer}>
                <li><h1>Sign In</h1></li>

                <li><input type="text" id="email" name="email" placeholder="Email"></input></li>
                <li><input type="text" id="pass" name="password" placeholder="Password"></input></li>
                <li><button>Sign In</button></li>
            </ul>
            <ul className={styles.signUpContainer}>
                <li className={styles.alignToButton}><h1>Don't Have An Account?</h1></li>
                <li><button>Sign Up Now!</button></li>
            </ul>
        </div>
    );
};
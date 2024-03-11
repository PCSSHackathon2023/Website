import styles from '../css/signin.module.css';
import { googleAuth } from '../../auth';

function Signin() {
	return (
		<div className={styles.login}>
			<button className={styles.signin_button} onClick={googleAuth}>
				<img src={require("../../assets/google.png")} className={styles.signin_google_logo} alt="Google Logo" />
				<p className={styles.sign_in_text}>
				Sign in with School Account
				</p>
			</button>
		</div>
	);
}

export default Signin;

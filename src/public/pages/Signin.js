import styles from './Signin.module.css';
import { googleAuth, pb } from '../../auth';

function Signin() {
	return (
		<div className={styles.Signin}>
			<div className="body">
				<div className={styles.login}>
					<button className={styles.signin_button} onClick={googleAuth}>
						<img src={require("../../assets/google.png")} className={styles.signin_google_logo} alt="Google Logo" />
						<p className={styles.sign_in_text}>
						Sign in with PDSB
						</p>
					</button>
					<button onClick={() => {pb.authStore.clear(); window.location.reload()}}>sign out</button>
				</div>
			</div>
		</div>
	);
}

export default Signin;

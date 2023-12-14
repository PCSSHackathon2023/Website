import styles from './Signin.module.css';

function Signin() {
	return (
		<div className={styles.Signin}>
			<div className="body">
				<div className={styles.login}>
					<button className={styles.signin_button}>
						<img src={process.env.PUBLIC_URL + "/assets/google.png"} className={styles.signin_google_logo} alt="Google Logo" />
						<p className={styles.sign_in_text}>
						Sign in with PDSB
						</p>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Signin;

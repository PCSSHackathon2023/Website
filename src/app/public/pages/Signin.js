import '../css/Signin.css';

function Signin() {
	return (
		<div className="Signin">
				<div className="login">
					<button className="signin-button">
						<img src={process.env.PUBLIC_URL + "/assets/google.png"} className="signin-google-logo" alt="Google Logo" />
						<p className="Sign-in-text">
						Sign in with Google
						</p>
					</button>
				</div>
		</div>
	);
}

export default Signin;

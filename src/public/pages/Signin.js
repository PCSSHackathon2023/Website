import styles from './Signin.module.css';
import {useState} from 'react';
import { googleAuth, pb } from '../../auth';

function Signin() {
	const [image, setImage] = useState('');

	pb.authStore.onChange((token, model) => {
		try {
			setImage(pb.files.getUrl(model, model.avatar, {'thumb': '96x96'}));
		} catch (err) {
			console.log(err);
		}
	});

	return (
		<div className={styles.Signin}>
			<div className="body">
				<div className={styles.login}>
					<img src={image} alt="Profile"></img>
					<button className={styles.signin_button} onClick={googleAuth}>
						<img src={require("../../assets/google.png")} className={styles.signin_google_logo} alt="Google Logo" />
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

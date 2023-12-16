import styles from './Signin.module.css';
import PocketBase from 'pocketbase'
const pb = new PocketBase('https://pb.mohil.ca/');

async function downloadImageFromUrl(url) {
  const xmlHTTP = new XMLHttpRequest();
  xmlHTTP.open('GET', url, true);
  xmlHTTP.responseType = 'blob';
  const imageBlob = await new Promise((resolve, reject) => {
    xmlHTTP.onload = e => xmlHTTP.status >= 200 && xmlHTTP.status < 300 && xmlHTTP.response.type.startsWith('image/') ? resolve(xmlHTTP.response) : reject(Error(`wrong status or type: ${xmlHTTP.status}/${xmlHTTP.response.type}`));
    xmlHTTP.onerror = reject;
    xmlHTTP.send();
  });
	const file = new File([imageBlob], 'image.png', {type: imageBlob.type});
  return file;
}

async function googleAuth() {
	const authData = await pb.collection('users').authWithOAuth2({provider: 'google'}).then((authData) => {
		if(authData.meta.isNew) {
			downloadImageFromUrl(authData.meta.avatarUrl).then(async (image) => {
				const userData = new FormData();
				userData.append("name", authData.meta.name);
				userData.append("avatar", image);
				const record = await pb.collection('users').update(authData.record.id, userData);
			})
		}
	});
}

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
				</div>
			</div>
		</div>
	);
}

export default Signin;

import styles from './UnknownPage.module.css';
import { Link } from "react-router-dom";

function UnknownPage() {
	return (
		<div className={styles.header}>
			<div className={styles.body}>
					<h1>404: Page not found</h1>
					<Link className={styles.button} to="/">Return to homepage</Link>
			</div>
		</div>
	);
}

export default UnknownPage;

import styles from './css/team.module.css'

export default function TeamCard() {
	return (
		<div className={styles.card}>
			<div className={styles.title}>
			Team
			<div className={styles.memberCount}>
				4/5
			</div>
			</div>
		</div>
	);
}

import styles from './css/team.module.css'
import { pb } from '../../auth';

export default function TeamMembers(props) {
	function TeamMembersCard() {
		var dom =	props.members.map((user) => {
			return (
			<div className={styles.member}>
				<img className={styles.profilePicture} src={pb.files.getUrl(user, user.avatar, {'thumb': '96x96'})} alt="Profile" />
				<div className={styles.name}> {user.name}</div>
			</div>
			)
		})
		return dom
	}

	return (
		<div className={styles.holder}>
			<TeamMembersCard />
		</div>
	);
}

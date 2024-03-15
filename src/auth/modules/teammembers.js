import styles from './css/team.module.css'
import { pb } from '../../auth';

import leaderIcon from '../../assets/teamleader.svg'
import acceptIcon from '../../assets/check.svg'
import declineIcon from '../../assets/exit.svg'
import optionsIcon from '../../assets/options.svg'

export default function TeamMembers(props) {
	function TeamMembersCard() {
		var dom =	props.members.map((user) => {
			return (
			<div className={styles.member}>
				<img className={styles.profilePicture} src={pb.files.getUrl(user, user.avatar, {'thumb': '96x96'})} alt="Profile" />
				<div className={styles.name}> {user.name}</div>
				{user.role === "leader" ? 
				<img src={leaderIcon} alt="Leader Icon" style={{filter: "invert(85%)", marginRight: "20px", marginLeft: "auto"}}/>
				: 
				<></>}
				{user.role === "requested" ? 
				<div style={{marginRight: "0", marginLeft: "auto"}}>
					<button title="Accept Request" className={styles.requestButton}>
						<img src={acceptIcon} alt="Leader Icon" style={{filter: "invert(85%)", translate: "0 2px 0"}}/>
					</button>
					<button title="Decline Request" className={styles.requestButton}>
						<img src={declineIcon} alt="Leader Icon" style={{filter: "invert(85%)", translate: "0 2px 0"}}/>
					</button>
				</div>
				: 
				<></>}
				{user.role !== "leader" && user.role !== "requested" ? 
				<button title="Member Options" className={styles.requestButton} style={{marginRight: "8px", marginLeft: "auto"}}>
					<img src={optionsIcon} alt="Leader Icon" style={{filter: "invert(85%)", translate: "0 2px 0"}}/>
				</button>
				:
				<></>}
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

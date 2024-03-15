import { useEffect, useState } from 'react';
import styles from './css/team.module.css'
import TeamMembers from './teammembers';
import { pb } from '../../auth';

export default function TeamCard() {
	const [members, setMembers] = useState([]);
	const [isLeader, setIsLeader] = useState(false);
	const [teamName, setTeamName] = useState([]);

	useEffect(() => {
		pb.collection('teams').getOne(pb.authStore.model.team, {fields: 'team_name,team_owner,requested_members'}).then((res) => {
			setTeamName(res.team_name)
			if(res.team_owner === pb.authStore.model.id) {
				setIsLeader(true);
			}
			pb.collection('users').getList(1, 6, {fields: 'id,name,avatar,collectionId'}).then((members) => {
				setMembers(members.items.map((user) => {
					if(user.id === res.team_owner) {
						user.role = "leader";
					} else if (res.requested_members.indexOf(user.id) > -1) {
						user.role = "requested";
					}
					return user;
				}))
			}).catch(() => {})
		}).catch(() => {})
	}, [])
	
	return (
	<>
	{pb.authStore.model.team === "" || pb.authStore.model.team === null ?
		<div className={styles.card}>
			<div className={styles.noTeam}>It looks like you don't have a team</div>
		</div>
	:
		<div className={styles.card}>
			<div className={styles.title}>
			Team: {teamName}
				<div className={styles.memberCount}>
					{members.length}/5
				</div>
			</div>
			<TeamMembers members={members} isLeader={isLeader} />
		</div> 
	}
	</>
	);
}

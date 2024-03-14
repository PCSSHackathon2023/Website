import { useEffect, useState } from 'react';
import styles from './css/team.module.css'
import TeamMembers from './teammembers';
import { pb } from '../../auth';

export default function TeamCard() {
	const [members, setMembers] = useState([]);
	const [teamName, setTeamName] = useState([]);

	useEffect(() => {
		pb.collection('users').getList(1, 6, {fields: 'id,name,avatar,collectionId'}).then((res) => {
			setMembers(res.items)
		})
		.catch(() => {})

		pb.collection('teams').getOne(pb.authStore.model.team, {fields: 'team_name'}).then((res) => {
			setTeamName(res.team_name)
		}).catch(() => {})
	}, [])
	
	console.log(pb.authStore.model)
	return (
		<div className={styles.card}>
			<div className={styles.title}>
			Team: {teamName}
				<div className={styles.memberCount}>
					{members.length}/5
				</div>
			</div>
			<TeamMembers members={members} />
		</div>
	);
}

import { useEffect, useRef, useState } from 'react';
import styles from './css/team.module.css'
import TeamMembers from './teammembers';
import { pb } from '../../auth';
import declineIcon from '../../assets/exit.svg'

async function selfLeave() {
	await pb.collection('teams').update(pb.authStore.model.team, {'member_count-': 1}).then(async () => {
		await pb.collection('users').update(pb.authStore.model.id, {'team': null}).then(() => {
			window.location.reload()
		})
	}).catch(() => {})
}

function generateCode() {
	return Math.random().toString(36).slice(4);
}

export default function TeamCard() {
	const [members, setMembers] = useState([]);
	const [isLeader, setIsLeader] = useState(false);
	const [teamName, setTeamName] = useState([]);
	const [teamCode, setTeamCode] = useState([]);
	const [noTeamDecision, setNoTeamDecision] = useState('');
	const [noTeamError, setNoTeamError] = useState('');
	const [updatePage, setUpdatePage] = useState(0);

	const teamInputRef = useRef();
	const teamCreateRef = useRef();
	const teamJoinRef = useRef();

	async function createTeam() {
		setNoTeamError("")
		var reg=/[^a-zA-Z0-9!@#$%^*_|]+/;
		if(reg.test(teamInputRef.current.value)){
			setNoTeamError("Invalid Characters")
			return 0;
		} else if (teamInputRef.current.value.length < 4 || teamInputRef.current.value.length > 24) {
			setNoTeamError("Invalid Name (between 4-24 characters)")
			return 0;
		} else {
			await pb.collection('teams').create({
				"team_name": teamInputRef.current.value,
				"team_code": generateCode(),
				"team_owner": pb.authStore.model.id,
				"member_count": 1
			}).then(async (res) => {
				await pb.collection('users').update(pb.authStore.model.id, {'team': res.id}).then(async () => {
					pb.collection("users").authRefresh().then(() => {
						setUpdatePage(updatePage + 1);
					})
				}).catch(() => {
					setNoTeamError("Error in Joining")
				});
			}).catch((err) => {
				try {
					if(Object.values(err.data.data.team_code).includes("validation_not_unique")) {
						setNoTeamError("Please Retry")
					} else {
						setNoTeamError("Error in Creation")
					}
				} catch {
					setNoTeamError("Error in Creation")
				}
			});
		}
	}

	async function joinTeam() {
		setNoTeamError("")
		var reg=/[^a-zA-Z0-9!@#$%^*_|]+/;
		if(reg.test(teamInputRef.current.value)){              
			setNoTeamError("Invalid Characters")
			return 0;
		} else if (teamInputRef.current.value.length < 8 || teamInputRef.current.value.length > 10) {
			setNoTeamError("Invalid Code")
			return 0;
		} else {
			await pb.collection('teams').getFirstListItem(`team_code="${teamInputRef.current.value}"`, {
				fields: 'id, team_code, member_count',
			}).then(async (res) => {
				if(res.member_count >= 5) {
					setNoTeamError("Max Amount of Members")
					return 0;
				} else {
					await pb.collection('users').update(pb.authStore.model.id, {'requested_team': res.id}).then(() => {
						teamInputRef.current.value = "";
						setNoTeamDecision("Valid Code");
						setNoTeamError("Request Sent: Team Leader Must Accept")
					});
				}
			}).catch((err)=>{
				setNoTeamError("Unknown Code")
				return 0;
			});
		}
	}

	useEffect(() => {
			pb.collection('teams').getOne(pb.authStore.model.team, {fields: 'id,team_name,team_owner,team_code'}).then((res) => {
				setTeamName(res.team_name)
				setTeamCode(res.team_code)
				if(res.team_owner === pb.authStore.model.id) {
					setIsLeader(true);
				}
				pb.collection('users').getList(1, 6, {fields: 'id,name,avatar,collectionId,requested_team'}).then((memberList) => {
					setMembers(memberList.items.map((user) => {
						if(user.id === res.team_owner) {
							user.role = "leader";
						} else if (user.requested_team === res.id) {
							user.role = "requested";
						} else {
							user.role = "member";
						}
						return user;
					}))
				}).catch(() => {})
			}).catch(() => {})
	}, [updatePage])
	
	return (
	<>
	{pb.authStore.model.team === "" || pb.authStore.model.team === null ?
		<div className={styles.card}>
			<div className={styles.noTeamCard}>
				<div className={styles.noTeam}>It looks like you don't have a team</div>
				{noTeamDecision === '' ? <></> :
					<div className={styles.teamInputHolder}>
						<button onClick={() => {setNoTeamDecision(""); setNoTeamError(""); teamCreateRef.current.disabled = false; teamJoinRef.current.disabled = false}}>
							<img src={declineIcon} alt="Close" style={{filter: "invert(85%)"}}/>
						</button>
						<input ref={teamInputRef} type="text" pattern="[a-zA-Z0-9!@#$%^*_|]{6,25}" placeholder={noTeamDecision} />
						<p className={styles.errorMessage}>{noTeamError}</p>
					</div>
				}
				<div className={styles.buttonHolder}>
					<button ref={teamCreateRef} onClick={() => {if(noTeamDecision === '') {setNoTeamDecision("Team Name"); teamJoinRef.current.disabled = true} else {createTeam()}}} className={styles.createTeamButton + " " + styles.teamButton}>Create Team</button>
					<button ref={teamJoinRef} onClick={() => {if(noTeamDecision === '') {setNoTeamDecision("Team Code"); teamCreateRef.current.disabled = true} else {joinTeam()}}} className={styles.joinTeamButton + " " + styles.teamButton}>Join Team</button>
				</div>
			</div>
		</div>
	:
		<div className={styles.card}>
			<div className={styles.title}>
			<div className={styles.teamName}>
				Team: {teamName}
			</div>
			
			{isLeader ? 
				<>
					<div className={styles.inviteCode}>
						Join Code: {teamCode}
					</div>
				</>
				:
				<button onClick={selfLeave} className={styles.actionButton + " " + styles.leaveButton}>Leave Group</button>
				}
				<div className={styles.memberCount}>
					Members: {members.length}/5
				</div>
			</div>
			<TeamMembers members={members} isLeader={isLeader} />
		</div> 
	}
	</>
	);
}

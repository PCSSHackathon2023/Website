import styles from './css/team.module.css'
import { pb } from '../../auth';

import leaderIcon from '../../assets/teamleader.svg'
import acceptIcon from '../../assets/check.svg'
import declineIcon from '../../assets/exit.svg'
import optionsIcon from '../../assets/options.svg'
import { useEffect, useRef } from 'react';

export default function TeamMembers(props) {
	const arr = [...new Array(props.members.length)].map(
    (_, index) => index
  );
	const optionsRef = useRef(arr);
	const saveRef = (index) => (element) => {
    optionsRef.current[index] = element;
  };

	function hideDropdowns() {
		optionsRef.current.map((element) => {
			element.classList.remove(styles.show);
			return 0;
		})
	}

	async function acceptUser(id) {
		await pb.collection('users').update(id, {'requested_team': null, 'team': pb.authStore.model.team}).then(async () => {
			await pb.collection('teams').update(pb.authStore.model.team, {'member_count+': 1}).then(() => {
				window.location.reload()
			});
		});
	}
	
	async function declineUser(id) {
		await pb.collection('users').update(id, {'requested_team': null, 'team': null}).then(() => {
			window.location.reload()
		});
	}
	
	// async function setLeader(id) {
	// 	await pb.collection('teams').update(pb.authStore.model.team, {'team_owner': id}).then(() => {
	// 		window.location.reload()
	// 	});
	// }
	
	async function removeMember(id) {
		await pb.collection('users').update(id, {'team': null}).then(async () => {
			await pb.collection('teams').update(pb.authStore.model.team, {'member_count-': 1}).then(() => {
				window.location.reload()
			});
		});
	}
	
	const handleOutsideClick = (event) => {
		if (!event.target.matches("." + styles.requestButton) && !event.target.matches("." + styles.firstOption) && !event.target.matches("." + styles.secondOption)) {
			hideDropdowns()
		}
	};

	useEffect(() => {

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [])


	function TeamMembersCard() {
		var dom =	props.members.map((user, index) => {
			return (
			<div className={styles.member}>
				<img className={styles.profilePicture} src={pb.files.getUrl(user, user.avatar, {'thumb': '96x96'})} alt="Profile" />
				<div className={styles.name}> {user.name}</div>
				{user.role === "leader" ? 
				<img src={leaderIcon} alt="Leader" style={{filter: "invert(85%)", marginRight: "20px", marginLeft: "auto"}}/>
				: 
				<></>}
				{user.role === "requested" ? 
				<div style={{marginRight: "0", marginLeft: "auto"}}>
					<button onClick={() => acceptUser(user.id)} title="Accept Request" className={styles.requestButton}>
						<img src={acceptIcon} alt="Accept" style={{filter: "invert(85%)", translate: "0 2px 0"}}/>
					</button>
					<button onClick={() => declineUser(user.id)} title="Decline Request" className={styles.requestButton}>
						<img src={declineIcon} alt="Decline" style={{filter: "invert(85%)", translate: "0 2px 0"}}/>
					</button>
				</div>
				: 
				<></>}
				{user.role !== "leader" && user.role !== "requested" && props.isLeader === true ? 
				<div className={styles.optionsHolder}>
					<button onClick={() => {optionsRef.current[index].classList.add(styles.show)}} title="Member Options" className={styles.requestButton} style={{marginRight: "8px", marginLeft: "auto"}}>
						<img src={optionsIcon} alt="Options" style={{filter: "invert(85%)", translate: "0 2px 0"}}/>
					</button>
					<div ref={saveRef(index)} class={styles.dropdownContent}>
						{/* <button className={styles.firstOption} onClick={setLeader}>
							<img src={leaderIcon} alt="Leader"/>
							Set Leader
						</button> */}
						<button className={styles.secondOption} onClick={() => removeMember(user.id)}>
							<img src={declineIcon} alt="Delete"/>
							Remove Member
						</button>
					</div>
				</div>
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

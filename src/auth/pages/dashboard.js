import { useState, useEffect } from "react";
import { pb } from "../../auth";

import styles from './dashboard.module.css'
import TeamCard from "../modules/teamcard";
import TimeLeft from "../modules/timeleft";
import TermsOfService from './terms'

function Dashboard() {
	const [signInStatus, setSignInStatus] = useState(false);
	const [modal, setModal] = useState(true);

	pb.authStore.onChange((token, model) => {
		try {
			setSignInStatus(pb.authStore.isValid);
		} catch (err) {
			// console.log(err);
		}
	});

	useEffect(() => {
		setModal(pb.authStore.model.accept_terms);
	}, [])

	return (
		<div className={styles.main}>
			{(pb.authStore.model.accept_terms || modal) ? <></> :
				<TermsOfService />
			}
			<h1 className={styles.name}>Welcome {pb.authStore.model.name.split(' ')[0]}</h1>
			<TimeLeft />
			<TeamCard />
		</div>
	);
}

export default Dashboard;

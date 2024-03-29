import { useState } from "react";
import { pb } from "../../auth";

import styles from './dashboard.module.css'
import TeamCard from "../modules/teamcard";
import TimeLeft from "../modules/timeleft";

function Dashboard() {
	const [signInStatus, setSignInStatus] = useState(false);

	pb.authStore.onChange((token, model) => {
		try {
			setSignInStatus(pb.authStore.isValid);
		} catch (err) {
			// console.log(err);
		}
	});

	return (
		<div className={styles.main}>
			<h1 className={styles.name}>Welcome {pb.authStore.model.name.split(' ')[0]}</h1>
			<TimeLeft />
			<TeamCard />
		</div>
	);
}

export default Dashboard;

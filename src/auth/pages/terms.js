import { useState } from "react";
import { pb } from "../../auth";

import styles from './terms.module.css'


function TermsOfService() {
	const [modal, setModal] = useState(true);

	async function accept() {
		const data = {
			"accept_terms": true,
		};
	
		await pb.collection('users').update(pb.authStore.model.id, data);
		setModal(false);
	}
	
	return (
		<>
		{pb.authStore.model.accept_terms && setModal ? <></> :
			<div className={styles.main}>
				<div className={styles.content}>
					<div className={styles.title}>
						HACKATHON TERMS
					</div>
					<ol className={styles.rules}>
						<li>
							Respect and Appropriateness: By participating in this hackathon, I agree to treat all other participants, volunteers, organizers, judges, mentors, and guests with respect at all times. 
							This includes refraining from any form of bullying, harassment, or discrimination.
						</li>
						<li>
							Reporting Inappropriate Behavior: If I witness or become aware of any inappropriate behavior by another participant, 
							I will report it to the hackathon organizers as soon as possible. 
							The organizers have the right to remove any participant who violates these terms of service, 
							and the ability to contact their school over any inappropriate behaviour.
						</li>
					</ol>
					<button onClick={accept} className={styles.accept}>Agree</button>
				</div>
			</div>
		}
		</>
	);
}

export default TermsOfService;

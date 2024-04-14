import { useState } from "react";
import { pb } from "../../auth";

import styles from './terms.module.css'


function TermsOfService() {
	const [showModal, setShowModal] = useState(true);

	async function accept() {
		await pb.collection('users').update(pb.authStore.model.id, {"accept_terms": true});
		setShowModal(false);
	}
	
	return (
		<>
			{showModal ? 
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
							Follow the Peel District School Board's Code of Conduct (<a href="https://www.peelschools.org/code-of-conduct">https://www.peelschools.org/code-of-conduct</a>)
						</li>
						<li>
							Reporting Inappropriate Behavior: If I witness or become aware of any inappropriate behavior by another participant, 
							I will report it to the hackathon organizers as soon as possible. 
							Managers/Organizers reserve the right to take any action as they see fit and to remove any participant who violates these terms of service, 
							and the ability to contact their school over any inappropriate behaviour.
						</li>
						<li>
							Reporting Inappropriate Behavior: If I witness or become aware of any inappropriate behavior by another participant, 
							I will report it to the hackathon organizers as soon as possible. 
							Managers/Organizers reserve the right to take any action as they see fit and to remove any participant who violates these terms of service, 
							and the ability to contact their school over any inappropriate behaviour.
						</li>
						<li>
							Do not use any personal information when creating a team name
						</li>
						<li>
							A form will be sent to your email address that your parents must sign and bring to the hackathon
						</li>
						<li>
							If your parents request any information about the hackathon please have them contact the organizer at <a href="mailto:p0076296@pdsb.net">p0076296@pdsb.net</a>
						</li>
					</ol>
					<div className={styles.acceptHolder}>
						<button onClick={accept} className={styles.accept}>Agree</button>
					</div>
				</div>
			</div>
			: <></>
			}
		</>
	);
}

export default TermsOfService;

import { useEffect, useRef, useState } from 'react';
import styles from './css/timeleft.module.css'

export default function TimeLeft() {

	const timeRef = useRef(null);
	const [timeLeft, setTimeLeft] = useState(null);

	useEffect(() => {
		var countDownDate = new Date("May 25, 2024 12:00:00").getTime();
		// Get today's date and time
		var now = new Date().getTime();
		
		// Find the distance between now and the count down date
		var distance = countDownDate - now;
		
		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
		setTimeLeft("Contest starts in " + days + " days");
	}, [])
		
	// If the count down is over, write some text 
	// if (distance < 0) {
	// 	document.getElementById("demo").innerHTML = "EXPIRED";
	// }

	return (
		<div className={styles.card}>
			<div ref={timeRef} className={styles.time}>
			{timeLeft}
			</div>
		</div>
	);
}

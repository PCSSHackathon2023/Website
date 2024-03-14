import { useEffect, useRef, useState } from 'react';
import styles from './css/timeleft.module.css'

export default function TimeLeft() {

	const timeRef = useRef(null);
	const [timeLeft, setTimeLeft] = useState(null);
	const zeroPad = (num, places) => String(num).padStart(places, '0')

	useEffect(() => {
		var countDownDate = new Date("May 25, 2024 21:00:00").getTime();
		var now = new Date().getTime();
		
		// Find the distance between now and the count down date
		var distance = countDownDate - now;
		
		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
		if(days <= 0) {
			setTimeLeft("Time Left: " + zeroPad(hours, 2) + ":" + zeroPad(minutes, 2) + ":" + zeroPad(seconds, 2))
		} else {
			setTimeLeft("Contest starts in " + days + " days");
		}
	}, [])
		
	return (
		<div className={styles.card}>
			<div ref={timeRef} className={styles.time}>
			{timeLeft}
			</div>
		</div>
	);
}

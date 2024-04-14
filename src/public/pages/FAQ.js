
import { useState} from 'react'
import "./Page.css";
import styles from "./FAQ.module.css";

const data = [
	{
		question:'What is a hackathon?',
		answer: 
		`
		A hackathon is an event where participants collaborate to design, build, and present technology solutions 
		within a designated time limit. This provides a platform for innovators to showcase their skills, 
		connect with other developers, designers, and entrepreneurs in an exciting and collaborative setting.
		`
	},
	{
		question:'How much does it cost to attend?',
		answer: 
		`
		This event is absolutely free to students, there is no cost to attend and participate!
		`
	},
	{
		question:'Where will it take place?',
		answer: 
		`
		The Hackathon will take place at Port Credit Secondary School, from 9 AM to 8 PM. 
		Students will travel between different areas of the school for workshops, presentations, and breaks.
		`
	},
	{
		question:'Is prior experience necessary?',
		answer: 
		`
		Prior experience is not at all necessary, 
		whether you are a seasoned coder or just starting out, 
		our hands-on workshops will teach students everything they need to know about how to create the perfect project!
		`
	},
	{
		question:'What kind of workshops and activities will there be?',
		answer: 
		`
		The workshops provided will include topics relating to AI, Hardware, Website Development, and Python.
		`
	},
	{
		question:'How many people can be on a team?',
		answer: 
		`
		Contestants may create teams of up to 5 people.
		`
	},
	{
		question:'Who can participate?',
		answer: 
		`
		Any student in Grades 6 to 8 can participate in this event.
		`
	},
]

function FAQ(){
	const[selected, setSelected] = useState(null)

	const toggle = (i) => {
		if (selected === i){
			return setSelected(null)
		}
		
		setSelected(i)
	}

	return (
		<div className={styles.body}>
			<div className={styles.accordion}>
				{data.map((item, i)=> (
					<div className={styles.item}>
						<div className={styles.title} onClick={() => toggle(i)}> 
							<h2>{item.question}</h2>   
								<div className={styles.switch}>
								<span>{selected === i ? '-':'+'}</span>
								</div>
							</div>
						<div className={selected === i ? styles.content + " " + styles.show:styles.content}>{item.answer}</div>
					</div>
				))}           
			</div>
		</div>
	)
}

export default FAQ

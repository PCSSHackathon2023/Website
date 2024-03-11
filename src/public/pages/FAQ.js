
import { useState} from 'react'
import "./Page.css";
import styles from "./FAQ.module.css";

const data = [
	{
		question:'Lorem ipsum?',
		answer: 
		'Answer 1'
	},
	{
		question:'Lorem ipsum?',
		answer: 
		'Answer 2'
	},
	{
		question:'Lorem ipsum?',
		answer: 
		'Answer 3'
	},
	{
		question:'Lorem ipsum?',
		answer: 
		'Answer 4'
	},
	{
		question:'Lorem ipsum?',
		answer: 
		'Answer 5'
	},
	{
		question:'Lorem ipsum?',
		answer: 
		'Answer 6'
	},
	{
		question:'Lorem ipsum?',
		answer: 
		'Answer 7'
	},
	{
		question:'Lorem ipsum?',
		answer: 
		'Answer 8'
	},
	{
		question:'Lorem ipsum?',
		answer: 
		'Answer 9'
	},
	{
		question:'Lorem ipsum?',
		answer: 
		'Answer 10'
	},
	{
		question:'Lorem ipsum?',
		answer: 
		`
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dictum, ex vitae aliquam rutrum, nibh magna accumsan nulla, sed varius diam orci fringilla arcu. Duis ut iaculis est, quis accumsan dolor. Quisque semper tellus congue viverra imperdiet. Proin congue tincidunt vehicula. Nullam mattis sodales imperdiet. Ut cursus tortor vitae porta eleifend. Vivamus tristique molestie nunc nec dignissim. Duis non ante ultrices, rhoncus purus in, iaculis mi. Suspendisse ultricies urna ut suscipit egestas.
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


import { useState} from 'react'
import "./Page.css";
import styles from "./FAQ.css";


function FAQ(){

    const[selected, setSelected] = useState(null)

    const toggle = (i) => {
        if (selected === i){
            return setSelected(null)
        }
        
        setSelected(i)
    }

    return (


            <div className='body'>
                
                <div className='wrapper'>
                            <div className='accordion'>
                                {data.map((item, i)=> (
                                    <div className="item">
                                        <div className="title" onClick={() => toggle(i)}> 
                                            <h2>{item.question}</h2>   
                                                <div className="switch">
                                                <span>{selected == i ? '-':'+'}</span>
                                                </div>
                                            </div>
                                        <div className={selected == i ? 'content show':'content'}>{item.awnser}</div>
                                    </div>
                                ))}           
                            </div>
                    </div>  
            </div>
    )
}
const data = [
    {
        question:'Q1:',
        awnser: 
        'Awnser 1'
    },
    {
        question:'Q2:',
        awnser: 
        'Awnser 2'
    },
    {
        question:'Q3:',
        awnser: 
        'Awnser 3'
    }
]
export default FAQ

import "./Page.css";
import styles from "./Homepage.module.css";
import Title from "../modules/partyTitle";

function Homepage() {
    return (
        <div className={styles.Homepage}>
            <div className="body">
                <Title text="KnowMore Hacks 2023" />
                <div className="page">
                    <p className={styles.text}>Welcome to the first annual Hackathon hosted by Port Credit Secondary School!</p>
                    <h2 className={styles.title}>Sponsors</h2>
                </div>
                
            </div>
        </div>
    );
}

export default Homepage;

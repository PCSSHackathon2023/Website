import styles from './App.module.css';
import Navbar from '../modules/navbar';

function App() {
	return (
		<div className="App">
			<Navbar />
			<header className={styles.header}>
				<p>PCSS Hackathon 2023</p>
				<p>Under Construction</p>
			</header>
		</div>
	);
}

export default App;

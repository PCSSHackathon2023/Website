import './Homepage.css';
import Title from '../modules/title';

function Homepage() {
	return (
		<div className="Homepage">
			<div className="body">
				<Title text="PCSS Hackathon 2023" />
				<div className="page">
					<button>test1</button>
					<button>test2</button>
				</div>
			</div>
		</div>
	);
}

export default Homepage;

import './UnknownPage.css';
import { Link } from "react-router-dom";

function UnknownPage() {
	return (
		<div className="UnknownPage">
			<div className="body">
					<h1>404: Page not found</h1>
					<Link className="button" to="/">Return to homepage</Link>
			</div>
		</div>
	);
}

export default UnknownPage;

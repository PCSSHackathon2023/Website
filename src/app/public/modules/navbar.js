import { Link } from "react-router-dom";
import header from "../css/navbar.module.css";

export default function Navbar() {
    return (
        <header className={header.header}>
            <h1 className={header.title}>KnowMore Hacks</h1>
            <div className={header.button}>
                <Link to="/" className={header.links}>
                    Home
                </Link>
                <Link to="/about" className={header.links}>
                    About
                </Link>
                <Link
                    to="/signin"
                    className={header.links + " " + header.signin}
                >
                    Sign In
                </Link>
            </div>
        </header>
    );
}

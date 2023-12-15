import { Link } from "react-router-dom";
import header from "../css/navbar.module.css";

export default function Navbar() {
    return (
        <header className={header.header}>
            <img src={require("../../assets/KnowMore_Logo.png")} className={header.logo} alt="KnowMore Hackathon logo"/>
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

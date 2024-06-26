import { Link } from "react-router-dom";
import {useEffect, useState, useRef} from 'react';
import header from "../css/navbar.module.css";
import { DropdownButton, DropdownItem } from './dropdown';
import { getUserImage, getUser, pb, signOut } from "../../auth";

import dashboardIcon from '../../assets/dashboard.svg'
import adminIcon from '../../assets/admin.svg'
import logoutIcon from '../../assets/logout.svg'

export default function Navbar() {
	const [image, setImage] = useState();
	const [username, setUsername] = useState();
	const [user, setUser] = useState({role: "default"});
	const [isMobile, setIsMobile] = useState(window.innerWidth < 720)
	const dropdownRef = useRef(null)

	const handleOutsideClick = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.matches("." + header.profile_picture) && !event.target.matches("." + header.profile_links)) {
			dropdownRef.current.classList.remove(header.show)
		} else {
			dropdownRef.current.classList.add(header.show)
		}
  };

	const handleResize = () => {
		if (window.innerWidth < 720) {
				setIsMobile(true)
		} else {
				setIsMobile(false)
		}
	}

	useEffect(() => {
		setImage(getUserImage());
		setUsername(getUser().name);
		setUser(getUser());

		window.addEventListener("resize", handleResize)

		document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
	}, [])

	pb.authStore.onChange((token, model) => {
		try {
			setImage(pb.files.getUrl(model, model.avatar, {'thumb': '96x96'}));
			setUsername(model.name);
			setUser(model);
		} catch (err) {
			console.log(err);
		}
	});

	return (
		<>
		{isMobile ?
		<header className={header.header}>
			<img src={require("../../assets/logo.png")} className={header.logo} alt="KnowMore Hackathon logo"/>
			<div className={header.button}>
				<Link to="/#home" className={header.links}>Home</Link>
				<Link to="/faq" className={header.links}>FAQ</Link>
				
				{ pb.authStore.isValid ?
				<button className={header.links + " " + header.profile_links}>
					<img className={header.profile_picture} src={image} alt="Profile" />
				</button>
				:
				<Link
					to="/#login"
					className={header.links + " " + header.signin}
				>
					Sign Up
				</Link>
				}

				<div ref={dropdownRef} className={header.dropdown}>
					<DropdownItem leftIcon={<img className={header.profile_picture} src={image} alt="Profile" />}>{username}</DropdownItem>
					<hr></hr>

					<DropdownButton 
					href="/user/dashboard" 
					leftIcon={
						<img src={dashboardIcon} alt="Dashboard Icon" style={{filter: "invert(85%)"}}/>
					}>
						User Dashboard
					</DropdownButton>

					{ user.role === "admin" ? 
					<DropdownButton 
					href="/admin/dashboard" 
					leftIcon={
						<img src={adminIcon} alt="Dashboard Icon" style={{filter: "invert(85%)"}}/>
					}>
						Admin Dashboard
					</DropdownButton> 
					: <></> }

					<DropdownButton 
					onClick={signOut} 
					leftIcon={
						<img src={logoutIcon} alt="Dashboard Icon" style={{filter: "invert(85%)"}}/>
					}>
						Sign Out
					</DropdownButton>
				</div>
			</div>
		</header>
		:
		<header className={header.header}>
			<img src={require("../../assets/logo.png")} className={header.logo} alt="KnowMore Hackathon logo"/>
			<div className={header.button}>
				<Link to="/#home" className={header.links}>Home</Link>
				<Link to="/#about" className={header.links}>About</Link>
				<Link to="/#sponsors" className={header.links}>Sponsors</Link>
				<Link to="/faq" className={header.links}>FAQ</Link>
				
				{ pb.authStore.isValid ?
				<button className={header.links + " " + header.profile_links}>
					<img className={header.profile_picture} src={image} alt="Profile" />
				</button>
				:
				<Link
					to="/#login"
					className={header.links + " " + header.signin}
				>
					Sign Up
				</Link>
				}

				<div ref={dropdownRef} className={header.dropdown}>
					<DropdownItem leftIcon={<img className={header.profile_picture} src={image} alt="Profile" />}>{username}</DropdownItem>
					<hr></hr>

					<DropdownButton 
					href="/user/dashboard" 
					leftIcon={
						<img src={dashboardIcon} alt="Dashboard Icon" style={{filter: "invert(85%)"}}/>
					}>
						User Dashboard
					</DropdownButton>

					{ user.role === "admin" ? 
					<DropdownButton 
					href="/admin/dashboard" 
					leftIcon={
						<img src={adminIcon} alt="Dashboard Icon" style={{filter: "invert(85%)"}}/>
					}>
						Admin Dashboard
					</DropdownButton> 
					: <></> }

					<DropdownButton 
					onClick={signOut} 
					leftIcon={
						<img src={logoutIcon} alt="Dashboard Icon" style={{filter: "invert(85%)"}}/>
					}>
						Sign Out
					</DropdownButton>
				</div>
			</div>
		</header>
		}
		</>
	);
}

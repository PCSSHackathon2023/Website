import { Link, useAsyncError } from "react-router-dom";
import {useEffect, useState, useRef} from 'react';
import header from "../css/navbar.module.css";
import { DropdownButton, DropdownItem } from './dropdown';
import { getUserImage, getUser, pb, signOut } from "../../auth";


export default function Navbar() {
	const [image, setImage] = useState();
	const [username, setUsername] = useState();
	const [user, setUser] = useState({role: "default"});
	const dropdownRef = useRef(null)

	const handleOutsideClick = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.matches("." + header.profile_picture) && !event.target.matches("." + header.profile_links)) {
			dropdownRef.current.classList.remove(header.show)
		} else {
			dropdownRef.current.classList.add(header.show)
		}
  };

	useEffect(() => {
		setImage(getUserImage());
		setUsername(getUser().name);
		setUser(getUser());

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
		<header className={header.header}>
			<img src={require("../../assets/KnowMore_Logo.png")} className={header.logo} alt="KnowMore Hackathon logo"/>
			<div className={header.button}>
				<Link to="/" className={header.links}>
					Home
				</Link>
				<Link to="/" className={header.links}>
					About
				</Link>
				<Link to="/" className={header.links}>
					Sponsors
				</Link>
				{ pb.authStore.isValid ?
				<a className={header.links + " " + header.profile_links}>
					<img className={header.profile_picture} src={image} alt="Profile" />
				</a>
				:
				<Link
					to="/signin"
					className={header.links + " " + header.signin}
				>
					Sign Up
				</Link>
				}

				<div ref={dropdownRef} className={header.dropdown}>
					<DropdownItem leftIcon={<img className={header.profile_picture} src={image} alt="Profile" />}>{username}</DropdownItem>
					<hr></hr>
					<DropdownButton href="/user/dashboard" leftIcon={"-"}>User Dashboard</DropdownButton>
					{ user.role === "admin" ? <DropdownButton href="/admin/dashboard" leftIcon={"-"}>Admin Dashboard</DropdownButton> : <></> }
					<DropdownButton onClick={signOut} leftIcon={"-"}>Sign Out</DropdownButton>
				</div>
			</div>
		</header>
	);
}

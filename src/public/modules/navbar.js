import { Link } from "react-router-dom";
import {useEffect, useState} from 'react';
import header from "../css/navbar.module.css";
import { getUserImage, pb } from "../../auth";

export default function Navbar() {
	const [image, setImage] = useState();

	useEffect(() => {
		setImage(getUserImage());
	}, [])

	pb.authStore.onChange((token, model) => {
		try {
			setImage(pb.files.getUrl(model, model.avatar, {'thumb': '96x96'}));
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
				<Link to="/about" className={header.links}>
					About
				</Link>
				{ pb.authStore.isValid ?
				<Link
					to="/signin"
					className={header.links + " " + header.profile_links}
				>
				<img className={header.profile_picture} src={image} alt="Profile" />
				</Link>
				:
				<Link
					to="/signin"
					className={header.links + " " + header.signin}
				>
					Sign Up
				</Link>
				}
			<button onClick={() => {pb.authStore.clear(); window.location.reload()}}>sign out</button>
			</div>
		</header>
		);
}

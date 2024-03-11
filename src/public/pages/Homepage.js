import "./Page.css";
import styles from "./Homepage.module.css";
import signinstyles from '../css/signin.module.css'
import Title from "../modules/partyTitle";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Signin from "../modules/signin";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { pb } from "../../auth";

function Homepage() {
    const scrollRef = useRef();
    const location = useLocation();
	const [signInStatus, setSignInStatus] = useState(false);

    function scrollToComponent() {
        if (window.location.hash === '#home') {
            scrollRef.current.scrollTo(0)
        }
        else if (window.location.hash === '#about') {
            scrollRef.current.scrollTo(0.9)
        }
        else if (window.location.hash === '#sponsors') {
            scrollRef.current.scrollTo(1.5)
        }
        else if (window.location.hash === '#login') {
            scrollRef.current.scrollTo(2)
        }
        window.location.hash = "#";
    }
    useEffect( () => {scrollToComponent()}, [location.hash] )

    pb.authStore.onChange((token, model) => {
		try {
            setSignInStatus(pb.authStore.isValid);
		} catch (err) {
			console.log(err);
		}
	});

    return (
        <div>
            <div className="body">
                <Parallax ref={scrollRef} pages={3}>
                    <ParallaxLayer
                        offset={0}
                        speed={1}
                        factor={2}
                        className={styles.topLayer}
                        style={{
                            backgroundImage: `url(${require("../../assets/stars_background.png")})`,
                            backgroundSize: "cover",
                        }}
                    >
                        <div className={styles.title}><Title text="KnowMore Hacks 2023" /></div>
                        <p className={styles.text}>
                            Welcome to the first annual Hackathon hosted by Port
                            Credit Secondary School!
                        </p>
                    </ParallaxLayer>
                    <ParallaxLayer
                        offset={1.17}
                        speed={-0.5}
                        style={{ zIndex: -1 }}
                    >
                        <h2 className={styles.fixedTitle}>About</h2>
                        <p className={styles.fixedText}>
                            Students in Grades 6-8 in Ontario's elementary
                            schools are invited to participate in the Hackathon,
                            which will provide them with an enjoyable
                            opportunity to test their knowledge and compete with
                            one another. It will be housed in Port Credit
                            Secondary School and run by the Peel District School
                            Board. The event will take over one day in May of
                            2024. Students will have a fantastic opportunity to
                            learn more about Peel Schools, particularly Port
                            Credit's SciTech program, through this challenge.
                        </p>
                    </ParallaxLayer>
                    <ParallaxLayer
                        offset={1.6}
                        speed={1}
                        factor={3}
                        className={styles.overlapLayer}
                        style={{
                            backgroundImage: `url(${require("../../assets/stars-nature_background.png")})`,
                            backgroundSize: "cover",
                        }}
                    ></ParallaxLayer>
                    <ParallaxLayer offset={1.7} speed={0.5} factor={3}>
                        <h2 className={styles.title}>Sponsors</h2>
                    </ParallaxLayer>
                    <ParallaxLayer offset={2} speed={0.9} factor={1}>
                    {signInStatus ? 
                        <div className={signinstyles.login}>
                            <Link to="/user/dashboard" className={signinstyles.signin_button}>
                                <p className={signinstyles.get_started_text}>
                                Get Started
                                </p>
                            </Link>
                        </div>
                    : 
                        <Signin />
                    }
                    </ParallaxLayer>
                </Parallax>
            </div>
        </div>
    );
}

export default Homepage;

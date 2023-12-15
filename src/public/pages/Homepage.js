import "./Page.css";
import styles from "./Homepage.module.css";
import Title from "../modules/partyTitle";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

function Homepage() {
    return (
        <div>
            <div className="body">
                <Parallax pages={3.5}>
                    <ParallaxLayer
                        offset={0}
                        speed={1}
                        factor={2}
                        className={styles.topLayer}
                        style={{
                            backgroundImage: `url(${require("../../assets/stars_background.png")})`,
                            backgroundSize: "cover",
                        }}
                    ></ParallaxLayer>
                    <ParallaxLayer
                        offset={0}
                        speed={0.5}
                        factor={2}
                        style={{ zIndex: 1 }}
                    >
                        <Title text="KnowMore Hacks 2023" />
                        <p className={styles.text}>
                            Welcome to the first annual Hackathon hosted by Port
                            Credit Secondary School!
                        </p>
                    </ParallaxLayer>
                    <ParallaxLayer
                        offset={1.1}
                        speed={-0.5}
                        style={{ zIndex: -1 }}
                    >
                        <h2 className={styles.fixedTitle}>About</h2>
                        <p className={styles.fixedText}>
                            Students in Grades 6–8 in Ontario's elementary
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
                        offset={1.5}
                        speed={1}
                        factor={4}
                        className={styles.overlapLayer}
                        style={{
                            backgroundImage: `url(${require("../../assets/stars-nature_background.png")})`,
                            backgroundSize: "cover",
                        }}
                    ></ParallaxLayer>
                    <ParallaxLayer offset={2} speed={0.5} factor={4}>
                        <h2 className={styles.title}>Sponsors</h2>
                    </ParallaxLayer>
                </Parallax>
            </div>
        </div>
    );
}

export default Homepage;

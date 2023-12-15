import "./Page.css";
import styles from "./Homepage.module.css";
import Title from "../modules/partyTitle";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

function Homepage() {
    return (
        <div>
            <div className="body">
                <Parallax pages={3}>
                    <ParallaxLayer
                        offset={0}
                        speed={1}
                        factor={2.5}
                        style={{
                            backgroundImage: `url(${require("../../assets/stars_background.webp")})`,
                            backgroundSize: "cover",
                        }}
                    ></ParallaxLayer>
                    <ParallaxLayer offset={0} speed={0.5} factor={2}>
                        <Title text="KnowMore Hacks 2023" />
                        <p className={styles.text}>
                            Welcome to the first annual Hackathon hosted by Port
                            Credit Secondary School!
                        </p>
                    </ParallaxLayer>
                    <ParallaxLayer
                        offset={1}
                        speed={1}
                        factor={3}
                        className={styles.overlapLayer}
                        style={{
                            backgroundImage: `url(${require("../../assets/stars-nature_background.jpg")})`,
                            backgroundSize: "cover",
                        }}
                    ></ParallaxLayer>
                    <ParallaxLayer offset={1.5} speed={.5} factor={4}>
                        <h2 className={styles.title}>Sponsors</h2>
                    </ParallaxLayer>
                </Parallax>
            </div>
        </div>
    );
}

export default Homepage;

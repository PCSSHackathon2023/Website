import "./Homepage.css";
import Title from "../modules/partyTitle";

function Homepage() {
    return (
        <div className="Homepage">
            <div className="body">
                <Title text="KnowMore Hacks 2023" />
                <div className="page">
                    <button>test1</button>
                    <button>test2</button>
                </div>
            </div>
        </div>
    );
}

export default Homepage;

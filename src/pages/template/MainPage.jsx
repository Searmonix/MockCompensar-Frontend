import MainSection from "../assets/sections/MainSection";
import FeaturesSection from "../assets/sections/FeaturesSection";

import "../../App.css"

const MainPage = () => {
    return(
        <div className="main-page">
            <>
                <MainSection />
                <FeaturesSection />
            </>
        </div>
    );
};

export default MainPage;
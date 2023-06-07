import PopularClassesSection from "../PopularClassesSection/PopularClassesSection";
import PopularInstructorsSection from "../PopularInstructorsSection/PopularInstructorsSection";
import Slider from "../Slider/Slider";

const Home = () => {
    return (
        <div>
          <Slider/>
          <PopularClassesSection/>
          <PopularInstructorsSection/>
        </div>
    );
};

export default Home;
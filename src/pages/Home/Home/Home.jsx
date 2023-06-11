import AdditionalInfo from "../AdditionalInfo/AdditionalInfo";
import PopularClassesSection from "../PopularClassesSection/PopularClassesSection";
import PopularInstructorsSection from "../PopularInstructorsSection/PopularInstructorsSection";
import Slider from "../Slider/Slider";

const Home = () => {
    return (
        <div>
          <Slider/>
          <PopularClassesSection/>
          <PopularInstructorsSection/>
          <AdditionalInfo/>
        </div>
    );
};

export default Home;
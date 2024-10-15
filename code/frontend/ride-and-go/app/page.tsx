import AdvantagesSection from "./components/Home/AdvantagesSection";
import FeaturesSection from "./components/Home/FeaturesSection";
import HeroSection from "./components/Home/HeroSection";
import StatisticsSection from "./components/Home/StatisticsSection";
import TestimonySection from "./components/Home/TestimonySection";





export default function page(){

    return(
        <div>
           <HeroSection/>
           <FeaturesSection/>
           <AdvantagesSection/>
           <StatisticsSection/>
           <TestimonySection/>
        </div>
    );
}
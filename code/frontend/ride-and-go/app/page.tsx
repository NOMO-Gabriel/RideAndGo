import PlueValue from "./components/Home/PlusValue";
import FeaturesSection from "./components/Home/FeaturesSection";
import HeroSection from "./components/Home/HeroSection";
import StatisticsSection from "./components/Home/StatisticsSection";
import TestimonySection from "./components/Home/TestimonySection";
import SubscribeSection from "./components/Home/SubscribeSection";





export default function page(){

    return(
        <div>
           <HeroSection/>
           <FeaturesSection/>
           <PlueValue/>
           <StatisticsSection/>
           <SubscribeSection/>
           <TestimonySection/>
        </div>
    );
}
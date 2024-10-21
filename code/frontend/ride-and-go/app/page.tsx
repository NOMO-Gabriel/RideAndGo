import PlueValue from "./components/Home/PlusValue";
import FeaturesSection from "./components/Home/FeaturesSection";
import HeroSection from "./components/Home/HeroSection";
import StatisticsSection from "./components/Home/StatisticsSection";
import TestimonySection from "./components/Home/TestimonySection";
import SubscribeSection from "./components/Home/SubscribeSection";


const images = [
    '/images/heroimg.jpeg', 
    '/images/heroimg3.jpeg', 
  ];
  
  const messages = {
    en: 'Discover a new way to Ride and Go',
    fr: 'Découvrez une nouvelle façon de vous déplacer'
  };

export default function page(){

    return(
        <div>
           <HeroSection images={images} messages={messages} />
          
           <FeaturesSection/>
           <PlueValue/>
           <StatisticsSection/>
           <SubscribeSection/>
           <TestimonySection/>
        </div>
    );
}
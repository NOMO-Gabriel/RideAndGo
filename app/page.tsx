'use client';

import PlueValue from "./components/Home/PlusValue";
import FeaturesSection from "./components/Home/FeaturesSection";
import VideoGuide from './components/Home/VideoGuide';

// import HeroSection from "./components/Home/HeroSection";
import StatisticsSection from "./components/Home/StatisticsSection";
import TestimonySection from "./components/Home/TestimonySection";
import SubscribeSection from "./components/Home/SubscribeSection";
import Equipe from "./components/Home/Equipe"
// import CompactFareCalculator from "./components/Home/FareCalculator";
import HeroFareCalculator from "./components/Home/FareCalculator";

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
           <HeroFareCalculator/>
           <FeaturesSection/>
           <VideoGuide/>
           <PlueValue/>
           <StatisticsSection/>
           <SubscribeSection/>
           <TestimonySection/>
           <Equipe />
        </div>
    );
}
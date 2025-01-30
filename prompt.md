l'erreur a diminue:
"npm run build
> ride-and-go@0.1.0 build
> next build
  ▲ Next.js 14.2.16
   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types    
 ✓ Collecting page data    
   Generating static pages (4/21)  [ ===][ 'ROLE_GUEST' ]
   Generating static pages (18/21)  [=   ]ReferenceError: window is not defined
    at /home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/app/page.js:1:621506
    at 3602 (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/app/page.js:1:767963)
    at t (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/webpack-runtime.js:1:128)
    at 9207 (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/app/page.js:1:122855)
    at t (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/webpack-runtime.js:1:128)
    at 4558 (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/app/page.js:1:1891)
    at Object.t [as require] (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/webpack-runtime.js:1:128)
    at require (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:16:18669)
    at I (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:12:94362)
    at C (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:12:92913) {
  digest: '598725112'
}
Error occurred prerendering page "/". Read more: https://nextjs.org/docs/messages/prerender-error
ReferenceError: window is not defined
    at /home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/app/page.js:1:621506
    at 3602 (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/app/page.js:1:767963)
    at t (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/webpack-runtime.js:1:128)
    at 9207 (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/app/page.js:1:122855)
    at t (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/webpack-runtime.js:1:128)
    at 4558 (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/app/page.js:1:1891)
    at Object.t [as require] (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/.next/server/webpack-runtime.js:1:128)
    at require (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:16:18669)
    at I (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:12:94362)
    at C (/home/gabriel/Documents/projects/4GI/AdminReseau/RideAndGo-clean/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:12:92913)
 ✓ Generating static pages (21/21)
> Export encountered errors on following paths:
        /page: /
(base) gabriel@gabriel-pc:~/Documents/projects/4GI/AdminReseau/RideAndGo-clean$ "
voici la page / :
"import PlueValue from "./components/Home/PlusValue";
import FeaturesSection from "./components/Home/FeaturesSection";
import HeroSection from "./components/Home/HeroSection";
import StatisticsSection from "./components/Home/StatisticsSection";
import TestimonySection from "./components/Home/TestimonySection";
import SubscribeSection from "./components/Home/SubscribeSection";
import CompactFareCalculator from "./components/Home/FareCalculator";
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













 );
}"
aide moi
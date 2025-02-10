'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import Link from "next/link";


export default function Component() {
    
  const {locale} = useLocale();
  return (
    <div>
      <Link
        href={"#"}
        className="flex flex-row p-2 justify-center items-center border rounded-md bg-white border-orange-btn hover:bg-orange-btn transition duration-300"
      >
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faUserTie}
            className="text-lg sm:text-xl md:text-2xl"
          />
        </div>
        <div className="text-center text-orange-btn hover:text-white font-extrabold text-base sm:text-1/2lg md:text-xl">
          {locale === 'en' ? "Become a driver" : "Devenir Chauffeur"}
        </div>
      </Link>
    </div>
  );
  
  
}

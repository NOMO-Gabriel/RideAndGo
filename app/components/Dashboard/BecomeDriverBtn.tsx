'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import Link from "next/link";


export default function Component() {
    
  const {locale} = useLocale();
    return (
      <div>
          <Link href={"#"} className=" flex flex-row p-2 justify-center item-center border rounded-md bg-white border-orange-btn hover:bg-orange-btn">
            <div className="mt-3">
              <FontAwesomeIcon icon={faUserTie}/>
            </div>
            <div className="text-center p-2 text-orange-btn  hover:text-white font-extrabold text-xl">
                {locale === 'en'? "Become a driver":"Devenir Chauffeur"}
            </div>
          </Link>
      </div>
    );
}

'use client'
import { useLocale } from "@/app/utils/hooks/useLocale.js";
import Link from "next/link";


export default function Component() {
  const  {locale} = useLocale();
    
    return (
      <div>
          <Link href="#" className="w-full h-14 bg-bleu-nuit text-white font-extrabold rounded-lg hover:bg-blue-900 p-2 cursor-pointer flex justify-center items-center">
              <div>
                {locale ==="en"? "UPGRADE":"Mettre a niveau"}
              </div>
          </Link>
      </div>
    );
}

'use client'
import { usePathname } from "next/navigation"

export default function Page() {
    const currentPath: string | null = usePathname();

    return (
      <div>
          <div className="text-center h-screen flex flex-col space-y-8 ">
            <h1 className="text-xl font-bold mt-3">I am a page, my path is:</h1>
            <h1 className={"text-3xl font-bold text-blue-500 "} >{currentPath || 'Path not found'}</h1> 
        </div>
      </div>
    );
}

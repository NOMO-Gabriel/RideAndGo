'use client'

import Image from "next/image";


export default function Component() {
    

    return (
      <div>
          <div className="flex flex-row space-x-2 ">
            <div className="relative h-12 w-12 rounded-full">
              <Image
              src="/images/profileImage.png"
              layout="fill" 
              alt={"profile img"}  
              className="rounded-full"          
              />
            </div>
            <div className="flex flex-col space-y-1">
                <div className="text-xl font-bold">
                  John Doe
                </div>
                <div className="text-sm">mail@example.com</div>
            </div>
          </div>
      </div>
    );
}

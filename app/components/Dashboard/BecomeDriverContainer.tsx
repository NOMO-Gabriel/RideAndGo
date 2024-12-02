'use client'

import BecomeDriverBtn from "./BecomeDriverBtn";
import UserInfos from "./UserCard";


export default function Component() {
    

    return (
      <div className="flex flex-row bg-blue-200 p-4 justify-between items-center w-full h-20">
          
            <div>
              <UserInfos/>
            </div>
            <div>
              <BecomeDriverBtn/>
            </div>
         
      </div>
    );
}

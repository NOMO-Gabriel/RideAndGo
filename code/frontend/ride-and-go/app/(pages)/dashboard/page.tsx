'use client'
import BecomeDriverContainer from "@/app/components/Dashboard/BecomeDriverContainer";
import PersonalInfos from "@/app/components/Dashboard/PersonalInfos";
import Sidebar from "@/app/components/Dashboard/Sidebar";


export default function Page() {
    
    return (
      <div className="flex flex-row px-20 bg-gray-100">
          {/* this is the sidebar */}
            <div className="flex flex-col w-2/10 bg-blue-200">
              <Sidebar/>
            </div>

          {/* this is the rigth side */}
          <div className="w-full">
              <div>
                <BecomeDriverContainer/>
              </div>
              {/* body */}
              <div>
                <PersonalInfos/>
              </div>
          </div>
          
      </div>
     
      
    );
}

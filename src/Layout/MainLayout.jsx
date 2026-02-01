import { useState } from "react";
import SideBar from "../Component/SideBarPanel";
import LogoArea from "../Component/LogoArea";
import NavBar from "../Component/NavBar";
import { TreePine } from "lucide-react";

export default function MainLayout({ children }) {

    const [headerData, setHeaderData] = useState({
        icon: TreePine,
        title: "Home",
        subtitle: "Welcome to your dashboard"
    });

    return (
        <div className="h-screen flex flex-col">
            {/* Header part -100px- */}
            <div className="h-[90px] bg-white-500 grid grid-cols-5 min-h-0">
                <div className="col-span-1 bg-white-500">
                <LogoArea/>
                </div>

                <div className="col-span-4 bg-[rgb(230,255,230)] flex justify-center items-center h-[100px] ">
                    <div className="w-[90%]">
                        <NavBar 
                        icon={headerData.icon}
                        title={headerData.title}
                        subtitle={headerData.subtitle} />
                    </div>
                </div>

            </div>

            {/* Bottom Part */}
            <div className="flex-1 grid grid-cols-5 min-h-0">

                {/* Sidebar content */}
                <div className="col-span-1 bg-white-500">
                <SideBar setHeaderData={setHeaderData} />
                </div>

                {/* Main Content part */}
                <div className="col-span-4 bg-[rgb(230,255,230)] overflow-auto min-h-0 w-full flex justify-center">
                    <div className="w-[90%]">
                        {children}
                    </div>
                </div>
                
            </div>
        </div>
    );
}
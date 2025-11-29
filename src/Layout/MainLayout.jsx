import SideBar from "../Component/SideBarPanel";
import LogoArea from "../Component/LogoArea";
import NavBar from "../Component/NavBar";

export default function MainLayout({ children }) {
    return (
        <div className="h-screen flex flex-col">
            {/* Header part -100px- */}
            <div className="h-[90px] bg-blue-500 grid grid-cols-5 min-h-0">
                <div className="col-span-1 bg-red-300">
                <LogoArea/>
                </div>

                <div className="col-span-4 bg-orange-300">
                <NavBar/>
                </div>
            </div>

            {/* Bottom Part */}
            <div className="flex-1 grid grid-cols-5 min-h-0">

                {/* Sidebar content */}
                <div className="col-span-1 bg-green-200">
                <SideBar/>
                </div>

                {/* Main Content part */}
                <div className="col-span-4 bg-yellow-300 overflow-auto min-h-0">
                    <div className="p-4 space-y-4">
                        {children}
                    </div>
                </div>
                
            </div>
        </div>
    );
}
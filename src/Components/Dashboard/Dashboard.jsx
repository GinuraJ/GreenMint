// import React from "react";
import React, { useState } from "react";
import "./Dashboard.css";

import CarbonCreditCal from '../CarbonCreditCal/CarbonCreditCal'
import TreeRepositoary from '../TreeRepository/TreeRepository'
import Calculationview from '../CalculationView/CalculationView'

export default function Dashboard() {

  const [activeComponent, setActiveComponent] = useState("home");

  const renderContent = () => {
    switch (activeComponent) {
      case "carbon":
        return <CarbonCreditCal />;
      case "tree":
        return <TreeRepositoary />;
      case "CalView":
        return <Calculationview/>;
    }
  };

  return(
    <div className="main h-full">
      <div className="sideBar">
        <div className="sideBarNav">
          <div className="sideBarNavContent">
          </div>
        </div>
        <div className="sideBarContent">

          <div className="sideBarBtnGroup">
            <button onClick={() => 
                  setActiveComponent("home")} 
                  className={`w-full text-left p-2 ${activeComponent === "home" ? "bg-gray-300" : "hover:bg-gray-200"}`}>Home</button>
            <button onClick={() => 
                setActiveComponent("quicklink")} 
                className={`w-full text-left p-2 ${activeComponent === "quicklink" ? "bg-gray-300" : "hover:bg-gray-200"}`}>Quick Link</button>
            <button onClick={() => 
            setActiveComponent("tree")} 
              className={`w-full text-left p-2 ${activeComponent === "tree" ? "bg-gray-300" : "hover:bg-gray-200"}`}>Build your Tree Repository</button>
            <button onClick={() => 
              setActiveComponent("carbon")} 
              className={`w-full text-left p-2 ${activeComponent === "carbon" ? "bg-gray-300" : "hover:bg-gray-200"}`}>Generate Carbon Credits</button>
          </div>

        </div>
      </div>
      <div className="contentBar">
        <div className="contentNav">
          <div className="contentNavContent">

          </div>
        </div>
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

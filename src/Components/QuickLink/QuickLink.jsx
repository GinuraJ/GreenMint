import "./QuickLink.css";

export default function QuickLink1(){
    return(
        <div className="test grid grid-cols-3 grid-rows-2 gap-2 w-full h-full">
            
            <div className="card bg-white">
                <div className="cardImg">
                    <p></p>
                </div>
                <div className="cardTexts">
                    <p>Carbon Credit Calculation</p>
                    <p>Carbon Credit Calculation</p>
                    <a href="#">View</a>
                </div>
            </div>
            <div className="bg-white">2</div>
            <div className="bg-white">3</div>
            <div className="bg-white">4</div>
            <div className="bg-white">5</div>
            <div className="bg-white">6</div>
        </div>
    )
}
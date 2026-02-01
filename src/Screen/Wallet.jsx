import MainLayout from "../Layout/MainLayout";
import WalletCardLayout from "../Layout/WalletCardLayout";
import WalletCard from "../Component/WalletCard";

export default function Wallet() {
    return (
        <MainLayout>

            <div className="w-full h-[2px] bg-gray-200 mt-4 mb-5"></div>

            <WalletCardLayout>
                <WalletCard icon={"💰"} lebel={"Cash Wallet"} amount={"LKR 400.00"} des={"Available Balance"}/>
                <WalletCard icon={"🍀"} lebel={"Carbon Credit Wallet"} amount={"12"} des={"Available Balance"}/>
                <WalletCard icon={"📉"} lebel={"Test"} amount={"..."} des={"Available Balance"}/>
            </WalletCardLayout>

            <h1>Recent Transactions</h1>
            
        </MainLayout>
    );
}
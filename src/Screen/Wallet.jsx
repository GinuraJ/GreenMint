import MainLayout from "../Layout/MainLayout";
import WalletCardLayout from "../Layout/WalletCardLayout";
import WalletCard from "../Component/WalletCard";

export default function Wallet() {
    return (
        <MainLayout>

            <h1>My Wallet</h1>

            <WalletCardLayout>
                <WalletCard icon={"💰"} lebel={"Cash Wallet"} amount={"$ 400.00"} des={"Available Balance"}/>
                <WalletCard icon={"🍀"} lebel={"Carbon Credit Wallet"} amount={"12"} des={"Available Balance"}/>
                <WalletCard icon={"📉"} lebel={"Test"} amount={"..."} des={"Available Balance"}/>
            </WalletCardLayout>

            <h1>Recent Transactions</h1>
            
        </MainLayout>
    );
}
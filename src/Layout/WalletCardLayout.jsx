
export default function WalletCardLayout({children}){
    return(
        <div className="grid grid-cols-1 md:grid-cols-3 w-full">
            {children}
        </div>
    )
}
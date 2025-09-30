
export default function WalletCard({icon,lebel,amount,des}){
    return(
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-80">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{icon} {lebel} Balance</h2>
            <p className="text-3xl font-bold text-green-600">{amount}</p>
            <p className="text-sm text-gray-500 mt-1">{des}</p>
        </div>
    )
}
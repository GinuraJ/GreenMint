export default function TabButton({ label, active, onClick }) {

    
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-t-lg border-b-2 transition ${
            active
                ? "border-blue-500 text-blue-700"
                : "border-transparent hover:bg-[rgb(255,255,255)] hover:border-gray-300"
            }`}
        >
            {label}
        </button>
    );
}
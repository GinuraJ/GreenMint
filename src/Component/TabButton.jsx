export default function TabButton({ label, active, onClick }) {

    
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-t-lg border-b-2 transition ${
            active
                ? "border-blue-500 bg-blue-100 text-blue-700"
                : "border-transparent hover:bg-gray-100"
            }`}
        >
            {label}
        </button>
    );
}
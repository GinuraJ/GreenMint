export default function PageHeader({ icon: Icon, title, subtitle }) {
    return (
        <div className="flex items-center gap-3">
            <div className="p-3 bg-[rgb(34,139,34)] flex items-center justify-center rounded-[20px]">
                <Icon color="white" size={35} />
            </div>

            <div className="flex flex-col">
                <p className="text-lg font-semibold text-[rgb(0,162,0)]">{title}</p>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
        </div>
    );
}

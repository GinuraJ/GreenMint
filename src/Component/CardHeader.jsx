export default function CardHeader({ icon: Icon, title, iconColor, iconBgColor}) {
    return (
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-${iconBgColor} flex items-center justify-center`}>
                <Icon color={iconColor} size={20} />
            </div>
            <p className="text-lg">{title}</p>
        </div>
    );
}

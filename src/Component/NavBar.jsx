import PageHeader from "../Component/PageHeader";

export default function NavBar({ icon, title, subtitle }) {
return (
    <div>
        <PageHeader icon={icon} title={title} subtitle={subtitle} />
    </div>
);
}

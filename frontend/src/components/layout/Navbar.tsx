const menuItems = [
    "Homes",
    "About",
    "Projects",
    "Skills",
    "Contacts",
    "blog",
    "services"
];

export default function Navbar() {
    return (
        <nav className="flex justify-between item-center px-10 py-5">
            <h2 className="text-2xl font-bold">Project AURA</h2>
            {menuItems.map((item)=>(
                <li key={item}>{item}</li>
            ))}
        </nav>
    );
}
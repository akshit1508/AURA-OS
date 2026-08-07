import NAV_LINKS from "@/constants/navigation"

export default function Navlinks(){
    return (
        <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link)=>(
               <li key={link.name} className="group relative">
  <a
    href={link.href}
    className="rounded-full
    px-4
    py-2
    text-sm
    font-medium
    text-gray-400
    transition-all
    duration-300
    hover:bg-blue-500/10
    hover:text-white
    hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]
    hover:scale-105"
  >
    {link.name}
  </a>

  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
</li>
            ))}
        </ul>
    );
}
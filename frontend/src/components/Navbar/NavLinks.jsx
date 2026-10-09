import Link from "next/link";
import NAV_LINKS from "@/constants/navigation"

export default function Navlinks(){
    return (
        <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link)=>(
               <li key={link.name} className="group relative">
  <Link
   
    href={link.href}
    className="rounded-full
    px-3
    py-1.5
    text-xs
    lg:px-4
    lg:py-2
    lg:text-sm
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
  </Link>

  <span className="absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-blue-500 transition-all duration-300 group-hover:w-1/2"></span>
</li>
            ))}
        </ul>
    );
}
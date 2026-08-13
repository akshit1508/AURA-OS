import Link from "next/link";
export default function NavLogo(){
    return (
        <Link href="/"
        className="group
cursor-pointer
text-2xl
font-bold
tracking-widest
text-white
transition-all
duration-300
hover:scale-105">
      AURA{" "}<span className="text-blue-500 transition-all duration-300 group-hover:text-blue-400">OS</span>

        </Link>
        );
}
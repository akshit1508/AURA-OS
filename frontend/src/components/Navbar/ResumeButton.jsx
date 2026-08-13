import Link from "next/link";
export default function ResumeButton(){
    return(
        <Link href="/resume" 
        className="rounded-full
border
border-blue-500/30
bg-white/5
px-8
py-2
text-sm
font-medium
text-white
backdrop-blur-md
transition-all
duration-300
hover:border-blue-400
hover:bg-blue-500/10
hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]">Resume 
</Link>
    );
}
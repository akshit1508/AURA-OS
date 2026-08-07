import AboutContent from "./AboutContent";
import AboutImage from "./AboutImage";
import AboutStats from "./AboutStats";
import AboutTimeline from "./AboutTimeline";
export default function About(){
    return(
        <section id="about" className=" bg-[#050816] py-32">
            <div className="mx-auto max-w-7xl px-8">
                <div className="grid grid-cols-2 gap-20 items-center">
                    <AboutContent />
                    <AboutImage />
                </div>
                <AboutStats />
                <AboutTimeline />
            </div>
        </section>
    );
}
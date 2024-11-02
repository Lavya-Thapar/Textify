import { cn } from "@/lib/utils";
import { crimsonText } from "./fonts/fonts";
import InteractiveBg from "./components/home/InteractiveBg";
import FeaturesCarousel from "./components/home/FeaturesCarousel";

export default function Home() {
  return (
    <div>
      <div className="md:h-screen flex flex-col items-center mt-20 md:mt-0 md:justify-center">
        <InteractiveBg />
        <div>
          <h1
            className={cn(
              "text-5xl md:text-9xl text-center z-[5]",
              crimsonText.className
            )}
          >
            Textify
          </h1>
          <p className="text-center text-base md:text-xl mt-3 md:mt-5">
            AI powered solution to all your text needs
          </p>
        </div>
      </div>
      <FeaturesCarousel />
    </div>
  );
}

import InteractiveBg from "./components/home/InteractiveBg";
import FeaturesCarousel from "./components/home/FeaturesCarousel";
import Hero from "./components/home/Hero";

export default function Home() {
  return (
    <div>
      <div className="md:h-screen flex flex-col items-center mt-20 md:mt-0 md:justify-center">
        <InteractiveBg />
        <Hero
          name="Textify"
          content="AI powered solution to all your text needs"
        />
      </div>
      <FeaturesCarousel />
    </div>
  );
}

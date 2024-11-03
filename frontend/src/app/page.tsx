import InteractiveBg from "./components/home/InteractiveBg";
import FeaturesCarousel from "./components/home/FeaturesCarousel";
import Hero from "./components/home/Hero";

export default function Home() {
  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-center">
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

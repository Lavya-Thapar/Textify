import { crimsonText } from "@/app/fonts/fonts";
import { cn } from "@/lib/utils";

const Hero = ({ name, content }: { name: string; content: string }) => {
  return (
    <div>
      <h1
        className={cn(
          "text-5xl md:text-9xl text-center z-[5]",
          crimsonText.className
        )}
      >
        {name}
      </h1>
      <p className="text-center text-base md:text-xl mt-3 md:mt-5">{content}</p>
    </div>
  );
};

export default Hero;

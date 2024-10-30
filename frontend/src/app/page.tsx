import { cn } from "@/lib/utils";
import { crimsonText } from "./fonts/fonts";
import InteractiveBg from "./components/InteractiveBg";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <InteractiveBg />
      <div>
        <h1 className={cn("text-9xl", crimsonText.className)}>Textify</h1>
        <p className="text-center text-xl mt-5">
          AI powered solution to all your text needs
        </p>
      </div>
    </div>
  );
}

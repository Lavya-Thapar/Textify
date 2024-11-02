"use client";

import { useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { crimsonText } from "@/app/fonts/fonts";

const features = [
  {
    heading: "Summarize videos",
    miniContent:
      "Don't have time to watch videos? Or do you prefer text over videos? We have you covered with our reliable video to text generation",
    content: {
      source: "",
      type: "video/mp4",
    },
  },
  {
    heading: "Notes generator",
    miniContent:
      "Now you no more need to make manual notes, because your online classes as well as videos from internet can now be automatically converted to brand new notes",
    content: {
      source: "",
      type: "video/mp4",
    },
  },
  {
    heading: "Image to text",
    miniContent:
      "Technology is meant for everyone, and in order to make it more accessible, we provide amazing service of converting any image into text or caption",
    content: {
      source: "",
      type: "video/mp4",
    },
  },
  {
    heading: "Story to poem and vice versa",
    miniContent:
      "Feeling an urge to be creative? Or are you an LOTR fan? Whatever the reason may be, you can always convert your stories into poems and vice versa",
    content: {
      source: "",
      type: "video/mp4",
    },
  },
  {
    heading: "Question Answer generator",
    miniContent:
      "Convert you research or study material in question and answer format, which helps not only in testing the understanding of concepts",
    content: {
      source: "",
      type: "video/mp4",
    },
  },
];

const FeaturesCarousel = () => {
  const [selected, setSelected] = useState<number>(0);
  return (
    <MaxWidthWrapper className="h-screen flex flex-col gap-16 items-center justify-center">
      <h1 className={cn("text-center text-8xl", crimsonText.className)}>
        Features
      </h1>
      <div className="flex items-center justify-center gap-10 w-full">
        <div className="flex-1">
          <ul className="flex flex-col gap-4">
            {features.map(({ heading, miniContent }, idx) => (
              <li
                key={idx}
                className="px-5 py-4 rounded-lg bg-slate-800 text-slate-200 cursor-pointer"
                aria-roledescription="button"
                onClick={() => {
                  if (selected === idx) {
                    setSelected(-1);
                  } else {
                    setSelected(idx);
                  }
                }}
              >
                <h2 className="block text-xl">{heading}</h2>
                <div className="overflow-hidden">
                  <p
                    className={cn(
                      "transition-all duration-300 text-lg text-slate-300",
                      idx === selected ? "mt-0" : "-mt-[13%]"
                    )}
                  >
                    {miniContent}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">Hi</div>
      </div>
    </MaxWidthWrapper>
  );
};

export default FeaturesCarousel;

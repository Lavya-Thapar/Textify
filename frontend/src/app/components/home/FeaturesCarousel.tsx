"use client";

import { useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { crimsonText } from "@/app/fonts/fonts";
import { throttle } from "lodash";

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

const MAX_DURATION = 3000;
const THROTTLE = 16;

const FeaturesCarousel = () => {
  const [state, setState] = useState<{
    selected: number;
    duration: number;
    isPlaying: boolean;
  }>({
    selected: 0,
    duration: 0,
    isPlaying: true,
  });

  const [isInView, setIsInView] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollFunction = throttle(() => {
      if (!carouselRef.current) return;
      const carouselTop = carouselRef.current.getBoundingClientRect().top;
      const carouselBottom = carouselRef.current.getBoundingClientRect().bottom;

      if (carouselBottom < 0 || carouselTop > window.innerHeight) {
        setIsInView(false);
      } else {
        setIsInView(true);
      }
    }, THROTTLE);

    window.addEventListener("scroll", scrollFunction);

    return () => window.removeEventListener("scroll", scrollFunction);
  }, []);

  useEffect(() => {
    if (!state.isPlaying) {
      return;
    }

    let interval: NodeJS.Timeout | null = null;
    if (isInView) {
      interval = setInterval(() => {
        setState(({ duration, selected, isPlaying }) => {
          if (!isPlaying) {
          }
          const newDuration = duration + THROTTLE;
          if (newDuration > MAX_DURATION) {
            return {
              duration: 0,
              selected: (selected + 1) % features.length,
              isPlaying,
            };
          } else {
            return { duration: newDuration, selected, isPlaying };
          }
        });
      }, THROTTLE);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isPlaying, isInView]);

  const { selected, duration } = state;

  return (
    <MaxWidthWrapper className="min-h-screen flex flex-col gap-16 items-center justify-center mt-20 md:mt-0">
      <h1
        className={cn(
          "text-center text-5xl md:text-8xl",
          crimsonText.className
        )}
      >
        Features
      </h1>
      <div className="flex justify-center gap-10 w-full" ref={carouselRef}>
        <div className="flex-1">
          <ul className="flex flex-col gap-4">
            {features.map(({ heading, miniContent }, idx) => (
              <li
                key={idx}
                className={cn(
                  "relative px-5 py-4 bg-slate-800 text-slate-200 cursor-pointer rounded-lg",
                  {
                    "md:rounded-t-none": selected === idx,
                  }
                )}
                aria-roledescription="button"
                onClick={() => {
                  if (selected === idx) {
                    setState({ duration: 0, selected: -1, isPlaying: false });
                  } else {
                    setState({ duration: 0, selected: idx, isPlaying: false });
                  }
                }}
              >
                <h2 className="block text-xl">{heading}</h2>
                <div className="overflow-hidden">
                  <p
                    className={cn(
                      "transition-all duration-300 mt-2 sm:text-lg text-slate-300",
                      idx === selected ? "mt-0" : "sm:-mt-[100%]"
                    )}
                  >
                    {miniContent}
                  </p>
                </div>
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 left-0 right-0 h-1 bg-blue-400",
                    { hidden: selected !== idx }
                  )}
                  style={{
                    boxShadow: "0px 0px 90px 3px #0aa",
                    transform: `scale(${duration / MAX_DURATION}, 1)`,
                    transformOrigin: "left",
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:block flex-1">
          <div className="bg-slate-300 rounded-lg w-full h-full" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default FeaturesCarousel;

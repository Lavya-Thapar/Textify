"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { throttle } from "lodash";

const PARTICLE_COUNT = 30;
const RADIUS = 10;
const VARIANCE = 100;
const PARALLAX_SCALE = 40;
const THROTTLE_AMOUNT = 16;

const getParticleProperties = ({
  screenWidth,
  screenHeight,
  idx,
}: {
  screenWidth: number;
  screenHeight: number;
  idx: number;
}) => {
  const sqrt = Math.sqrt(PARTICLE_COUNT);

  const initX = (screenWidth * (idx % sqrt)) / sqrt;
  const initY = (screenHeight * Math.floor(idx / sqrt)) / sqrt;
  // higher zIndex means closer
  const zIndex = Math.random();
  const r = RADIUS + zIndex * 5;

  return {
    top: initY + Math.random() * VARIANCE,
    left: initX + Math.random() * VARIANCE,
    width: r,
    height: r,
    opacity: zIndex,
    // Hack: typically zIndex is not fraction but we need it here not for style but motion
    zIndex: zIndex,
    boxShadow: `0 0 ${1 + 5 * (1 - zIndex)}px ${zIndex * 3}px black`,
  };
};

const RandomParticle = ({
  style,
  particleRef,
}: {
  style: React.CSSProperties;
  particleRef: any;
}) => {
  return (
    <div
      className="absolute rounded-full bg-black transition-transform duration-75"
      style={style}
      ref={particleRef}
    />
  );
};

const InteractiveBg = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const particlesRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const updateMousePosition = throttle((ev: MouseEvent) => {
      const x = ev.clientX;
      const y = ev.clientY;

      // determine how far points go
      const absoluteDistanceX = x - width / 2;
      const absoluteDistanceY = y - height / 2;

      const scaledDistanceX = absoluteDistanceX / PARALLAX_SCALE;
      const scaledDistanceY = absoluteDistanceY / PARALLAX_SCALE;

      // greater the zIndex, more the movement
      particlesProperties.forEach(({ zIndex }, idx) => {
        const particle = particlesRef.current[idx];
        if (!particle) return;
        const moveX = scaledDistanceX * zIndex;
        const moveY = scaledDistanceY * zIndex;
        particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }, THROTTLE_AMOUNT);
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setLoading(true);
  }, []);

  // We don't want random values to get re-created at each re-render due to change in state
  const particlesProperties = useMemo(
    () =>
      Array(PARTICLE_COUNT)
        .fill(0)
        .map((_, idx) =>
          getParticleProperties({
            screenWidth: width,
            screenHeight: height,
            idx,
          })
        ),
    [width, height]
  );

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-opacity duration-1000",
        !loading ? "opacity-0" : "opacity-100"
      )}
      aria-hidden="true"
    >
      {particlesProperties.map((style, idx) => (
        <RandomParticle
          style={style}
          key={idx}
          particleRef={(el: any) => (particlesRef.current[idx] = el)}
        />
      ))}
    </div>
  );
};

export default InteractiveBg;

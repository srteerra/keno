import React, { useState, useEffect, useRef } from "react";

const Keno: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setBlink(true);
        setTimeout(() => setBlink(false), 150);
      },
      3000 + Math.random() * 2000
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!cubeRef.current) return;

    const rect = cubeRef.current.getBoundingClientRect();
    const cubeCenterX = rect.left + rect.width / 2;
    const cubeCenterY = rect.top + rect.height / 2;

    const deltaX = mousePos.x - cubeCenterX;
    const deltaY = mousePos.y - cubeCenterY;

    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(
      Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 8,
      7
    );

    setEyePos({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    });
  }, [mousePos]);

  return (
    <div
      ref={cubeRef}
      className="relative flex h-20 w-20 items-center justify-center gap-2 rounded-3xl bg-[#131515] shadow-2xl duration-100"
      style={{
        transform: "perspective(800px) rotateX(5deg) rotateY(5deg)",
      }}
    >
      <div
        className={`h-2.5 w-2.5 rounded-full bg-white transition-all duration-25 ${
          blink ? "scale-0" : "scale-100"
        }`}
        style={{
          transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
          willChange: "transform",
        }}
      />

      <div
        className={`h-2.5 w-2.5 rounded-full bg-white transition-all duration-25 ${
          blink ? "scale-0" : "scale-100"
        }`}
        style={{
          transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default Keno;

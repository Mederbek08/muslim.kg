import React, { useState, useEffect, useRef } from "react";

// 🎨 Custom CSS — ак фонго ылайыктуу
const CUSTOM_CURSOR_STYLES = `
  body {
    cursor: none !important;
  }

  @keyframes fadeOut {
    0% { opacity: 0.8; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.6); }
  }

  .cursor-trail-line {
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    height: 2px;
    background: linear-gradient(90deg, rgba(0,255,255,0.8), rgba(0,255,180,0));
    border-radius: 2px;
    opacity: 0.6;
    animation: fadeOut 0.8s linear forwards;
  }

  .cursor-glow {
    filter: drop-shadow(0 0 8px rgba(0,255,255,0.8))
            drop-shadow(0 0 18px rgba(0,255,150,0.8));
  }
`;

const useMousePosition = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClick(true);
    const up = () => setClick(false);
    const over = (e) => {
      if (e.target.closest("a") || e.target.closest("button") || e.target.classList.contains("link-hover")) {
        setHover(true);
      } else setHover(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return { pos, hover, click };
};

const CustomCursor = ({ isLoading = false }) => {
  const { pos, hover, click } = useMousePosition();
  const [trailLines, setTrailLines] = useState([]);
  const lastPos = useRef(pos);

  // CSS кошуу
  useEffect(() => {
    const s = document.createElement("style");
    s.innerHTML = CUSTOM_CURSOR_STYLES;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  // 🚀 Trail линия түзүү
  useEffect(() => {
    if (!lastPos.current.x || !lastPos.current.y) {
      lastPos.current = pos;
      return;
    }

    const dx = pos.x - lastPos.current.x;
    const dy = pos.y - lastPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 4) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const newLine = {
        id: Date.now(),
        x: lastPos.current.x,
        y: lastPos.current.y,
        width: distance,
        rotation: angle,
      };

      setTrailLines((prev) => [...prev.slice(-15), newLine]);
      lastPos.current = pos;
    }

    const timer = setTimeout(() => {
      setTrailLines((prev) => prev.slice(1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [pos]);

  if (isLoading) {
    return (
      <div
        className="fixed z-[9999] border-4 border-t-transparent border-white rounded-full"
        style={{
          width: 20,
          height: 20,
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%) rotate(0deg)",
        }}
      />
    );
  }

  return (
    <>
      {trailLines.map((line) => (
        <div
          key={line.id}
          className="cursor-trail-line"
          style={{
            left: `${line.x}px`,
            top: `${line.y}px`,
            width: `${line.width}px`,
            transform: `rotate(${line.rotation}deg)`,
          }}
        />
      ))}

      <div
        className={`fixed rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[9999] cursor-glow transition-all duration-150 ease-out`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: hover ? 26 : 18,
          height: hover ? 26 : 18,
          background: click
            ? "radial-gradient(circle, #00f5d4 0%, #00bbf9 100%)"
            : "linear-gradient(135deg, #00f5d4, #00bbf9)",
          opacity: hover ? 0.8 : 1,
          boxShadow: click
            ? "0 0 25px 5px rgba(0,255,200,0.6)"
            : "0 0 15px 4px rgba(0,255,255,0.4)",
        }}
      />
    </>
  );
};

export default CustomCursor;

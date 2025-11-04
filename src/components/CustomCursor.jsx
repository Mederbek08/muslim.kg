import React, { useState, useEffect, useRef } from "react";

// CSS
const CUSTOM_CURSOR_STYLES = `
body { cursor: none !important; }

@keyframes pulseGlow {
  0% { box-shadow: 0 0 8px rgba(0,150,255,0.4), 0 0 16px rgba(0,100,200,0.2);}
  50% { box-shadow:0 0 20px rgba(0,150,255,0.8),0 0 40px rgba(0,100,200,0.5);}
  100% { box-shadow:0 0 8px rgba(0,150,255,0.4),0 0 16px rgba(0,100,200,0.2);}
}

.cursor-pulse { animation: pulseGlow 2.2s ease-in-out infinite; }
.cursor-glow {
  filter: drop-shadow(0 0 8px rgba(0,150,255,0.6)) drop-shadow(0 0 16px rgba(0,100,200,0.4));
}

.cursor-particle {
  position: fixed;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(0,180,255,1) 0%, rgba(0,100,200,0) 80%);
  opacity: 0.8;
  z-index: 9998;
  transition: all 0.8s ease-out;
}

.cursor-trail {
  position: fixed;
  height: 2px;
  pointer-events: none;
  background: linear-gradient(90deg, rgba(0,180,255,0.6), rgba(0,100,200,0));
  border-radius: 2px;
  z-index: 9997;
  transition: all 0.8s ease-out;
}
`;

const useMouse = () => {
  const [pos, setPos] = useState({ x:0, y:0 });
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(()=>{
    const move = e=>setPos({x:e.clientX,y:e.clientY});
    const down=()=>setClick(true);
    const up=()=>setClick(false);
    const over=e=>{
      if(e.target.closest("a")||e.target.closest("button")||e.target.classList.contains("link-hover"))
        setHover(true);
      else setHover(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);

    return ()=>{
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return {pos, hover, click};
};

const CustomCursor = () => {
  const {pos, hover, click} = useMouse();
  const [particles, setParticles] = useState([]);
  const [trail, setTrail] = useState([]);
  const lastPos = useRef(pos);

  // CSS кошуу
  useEffect(()=>{
    const s = document.createElement("style");
    s.innerHTML = CUSTOM_CURSOR_STYLES;
    document.head.appendChild(s);
    return ()=>document.head.removeChild(s);
  },[]);

  // Particle жана trail генерация
  useEffect(()=>{
    const dx = pos.x - lastPos.current.x;
    const dy = pos.y - lastPos.current.y;
    const distance = Math.sqrt(dx*dx + dy*dy);

    if(distance > 2){
      // Particle: көк нуручалар
      for(let i=0;i<3;i++){
        const p = {
          id: Date.now()+Math.random(),
          x:lastPos.current.x,
          y:lastPos.current.y,
          dx:(Math.random()-0.5)*3,
          dy:(Math.random()-0.5)*3
        };
        setParticles(prev=>[...prev.slice(-120), p]);
      }

      // Trail линия: түтүн сыяктуу узак
      const t = {
        id: Date.now(),
        x1:lastPos.current.x,
        y1:lastPos.current.y,
        x2:pos.x,
        y2:pos.y
      };
      setTrail(prev=>[...prev.slice(-50), t]);

      lastPos.current = pos;
    }

    // Particle’лерди кыймылдатуу жана акырында жоготуу
    const interval = setInterval(()=>{
      setParticles(prev=>prev.map(p=>({ ...p, x:p.x+p.dx, y:p.y+p.dy })));
      setParticles(prev=>prev.filter(p=>Date.now()-p.id<800));
      setTrail(prev=>prev.filter(t=>Date.now()-t.id<800));
    },16);

    return ()=>clearInterval(interval);
  },[pos]);

  return (
    <>
      {/* Trail сызык (түтүндөй) */}
      {trail.map(line=>(
        <div
          key={line.id}
          className="cursor-trail"
          style={{
            left:`${Math.min(line.x1,line.x2)}px`,
            top:`${Math.min(line.y1,line.y2)}px`,
            width:`${Math.max(Math.abs(line.x2-line.x1),1)}px`,
            transform:`rotate(${Math.atan2(line.y2-line.y1,line.x2-line.x1)*180/Math.PI}deg)`,
            opacity:0.5
          }}
        />
      ))}

      {/* Particle’лер (көк нурчалар) */}
      {particles.map(p=>(
        <div
          key={p.id}
          className="cursor-particle"
          style={{ left:`${p.x}px`, top:`${p.y}px`, opacity:0.8 }}
        />
      ))}

      {/* Main Cursor (ток, караңгы) */}
      <div
        className={`fixed rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[9999] cursor-glow cursor-pulse transition-all duration-150 ease-out`}
        style={{
          left:`${pos.x}px`,
          top:`${pos.y}px`,
          width:hover?24:16,
          height:hover?24:16,
          background: click
            ?"radial-gradient(circle,#0055ff 0%,#0033aa 100%)"
            :"linear-gradient(135deg,#0044cc,#002288)",
          opacity:hover?0.9:1,
          transform:click
            ?"translate(-50%,-50%) scale(0.8)"
            :"translate(-50%,-50%) scale(1)"
        }}
      />
    </>
  );
};

export default CustomCursor;

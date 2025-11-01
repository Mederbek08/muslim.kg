

import React, { useState, useEffect, useRef } from 'react';

// --- A. Встроенные CSS-стили и Анимация ---
// ВНИМАНИЕ: Стили body{cursor: none} должны быть добавлены в ваш глобальный CSS.
const CUSTOM_CURSOR_STYLES = `
  /* * Добавьте в ваш глобальный CSS (например, index.css):
   * body { cursor: none !important; }
   */
  
  /* Анимация вращения для курсора загрузки */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .loading-cursor-spin {
    animation: spin 1s linear infinite;
  }
`;

// --- B. Хук для отслеживания мыши ---
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const frame = useRef();

  useEffect(() => {
    const updateMouse = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!frame.current) {
        frame.current = requestAnimationFrame(() => {
          setPosition(mouse.current);
          frame.current = null;
        });
      }
    };

    const handleLinkHover = (e) => {
      // Проверяем, наведен ли курсор на элемент с классом 'link-hover'
      // или на стандартные интерактивные элементы.
      if (e.target.closest('.link-hover') || e.target.closest('a') || e.target.closest('button')) {
        setIsHoveringLink(true);
      } else {
        setIsHoveringLink(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseover', handleLinkHover); 
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseover', handleLinkHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return { position, isHoveringLink, isClicking };
};

// --- C. Компонент CustomCursor (для импорта) ---
export const CustomCursor = ({ isLoading = false }) => {
  const { position, isHoveringLink, isClicking } = useMousePosition();
  
  // Добавляем встроенные стили (чтобы не просить пользователя добавлять их вручную)
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = CUSTOM_CURSOR_STYLES;
    document.head.appendChild(styleEl);
    
    // Очистка при размонтировании
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);


  const baseClass = 'fixed rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[9999] transition-all duration-100 ease-out';
  
  // 1. Курсор для ССЫЛКИ (Link Cursor)
  const linkCursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    // Увеличение при наведении на ссылку/кнопку
    transform: isHoveringLink 
      ? `translate(-50%, -50%) scale(4)` 
      : `translate(-50%, -50%) scale(0)`, 
    transitionDuration: '200ms',
  };
  
  // 2. ОСНОВНОЙ КУРСОР (Main Cursor)
  const mainCursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    // Эффект нажатия: уменьшаем масштаб
    transform: isClicking 
      ? 'translate(-50%, -50%) scale(0.6)' 
      : 'translate(-50%, -50%) scale(1)',
    transitionDuration: '150ms',
    // При наведении на ссылку, основной курсор уменьшается и становится менее заметным
    opacity: isHoveringLink ? 0.2 : 0.8,
  };

  // 3. Курсор для ЗАГРУЗКИ (Loading Cursor)
  const loadingCursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    // Показываем только при isLoading === true
    transform: isLoading 
      ? `translate(-50%, -50%) scale(5)` 
      : `translate(-50%, -50%) scale(0)`, 
    transitionDuration: '300ms',
  };

  // Если идет загрузка, скрываем все, кроме курсора загрузки
  if (isLoading) {
      return (
          // Курсор загрузки (вращающийся)
          <div 
            style={loadingCursorStyle} 
            className={`${baseClass} w-2 h-2 border-4 border-t-transparent border-white loading-cursor-spin`} 
          />
      );
  }

  return (
    <>
      {/* 1. Курсор для ССЫЛКИ (Link/Hover Cursor) */}
      <div 
        style={linkCursorStyle} 
        className={`${baseClass} w-2 h-2 bg-green-300 mix-blend-difference`} 
      />

      {/* 2. ОСНОВНОЙ КУРСОР (Main Cursor) */}
      <div 
        style={mainCursorStyle} 
        className={`${baseClass} w-2 h-2 bg-gradient-to-r from-green-300 to-blue-300`} 
      />
    </>
  );
};

export default CustomCursor;
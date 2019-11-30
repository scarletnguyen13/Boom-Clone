import React, { useState } from 'react';
import useWindowDimensions from './WindowDimensions';

import './Character.css';

const CHARACTER_SIZE = 85;
const MOVE_RATE = 50;

const Character: React.FC = () => {
  const { height, width } = useWindowDimensions();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  
  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      setX((x - MOVE_RATE) < 0 ? 0 : (x - MOVE_RATE));
    } else if (event.key === "ArrowUp") {
      setY((y - MOVE_RATE) < 0 ? 0 : (y - MOVE_RATE));
    } else if (event.key === "ArrowRight") {
      setX((x + CHARACTER_SIZE + MOVE_RATE) > width ? (width - CHARACTER_SIZE) : (x + MOVE_RATE));
    } else if (event.key === "ArrowDown") {
      setY((y + CHARACTER_SIZE + MOVE_RATE) > height ? (height - CHARACTER_SIZE) : (y + MOVE_RATE));
    } 
  };

  return (
    <div id="character-container" style={{left: x, top: y}}>
        <input type = "button" id="character-input" onKeyDown={(e) => handleKeyPress(e)} autoFocus
               ref={input => input && input.focus()}/>
    </div>
  );
}

export default Character;

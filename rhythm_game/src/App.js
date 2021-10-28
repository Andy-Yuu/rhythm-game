import { useState, useEffect, useRef } from 'react';
import './App.css';
import uarr from './images/uarr.png';
import rarr from './images/rarr.png';
import darr from './images/darr.png';
import larr from './images/larr.png';


function App() {
  const numberOfArrows = 10;
  const ARROWS = {
    38: uarr, 
    39: rarr, 
    40: darr, 
    37: larr,
  };

  const [arrows, setArrows] = useState([]);
  const [position, setPosition] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const arrowsRef = useRef(arrows);
  const setNewArrowsState = (data) => {
    arrowsRef.current = data;
    setArrows(data);
  };
  const positionRef = useRef(position);
  const setNewPositionState = (data) => {
    positionRef.current = data;
    setPosition(data);
  };
  const scoreRef = useRef(score);
  const setNewscoreState = (data) => {
    scoreRef.current = data;
    setScore(data);
  };

  const generateArrows = () => {
    const newArrows = [];
    for (let i = 0; i < numberOfArrows ; i++) {
      newArrows.push(ARROWS[Math.floor(Math.random() * (40 - 37 + 1) + 37)]);
    }
    setNewArrowsState(newArrows);
  }

  const handleKeyDown = (event) => {
    // up arrow key code: 38
    // right arrow key code: 39
    // down arrow key code: 40
    // left arrow key code: 37
    if (![38, 39, 40, 37].includes(event.keyCode)) return;
    const keyToArrow = ARROWS[event.keyCode];
    const doneRow = (positionRef.current === (numberOfArrows - 1) && arrowsRef.current[positionRef.current] === keyToArrow);
    if (arrowsRef.current.length === 0 || doneRow) {
      //either starting the game or has finished a row
      if (doneRow) {
        setNewPositionState(0);
        setNewscoreState(scoreRef.current + 10);
      }
      generateArrows();
      return;
    }
    if (arrowsRef.current[positionRef.current] === keyToArrow) {
      // match 
      setNewPositionState(positionRef.current + 1);
    } else {
      setNewPositionState(0);
    }
  };

  return (
    <div className="App">
      <div className='Content'>
        {arrows.length === 0 ? (
          <div>
            Press any arrow key to start!
          </div>
        ) : (
          <div>
            Score: {score}
          </div>
        )}
      </div>
      <div className="Container">
        {arrows.map((arrow, index) => (
          <img 
            key={index}
            src={arrow}
            alt="arrow"
            style={{
              height: 'auto', 
              width: '100px', 
              marginRight: '10px', 
              visibility: position > index ? 'hidden' : '', 
              opacity: position > index ? 0 : '', 
              transition: position > index ? 'transform 0.25s, visibility 0s 0.25s, opacity 0.25s linear' : '',
              transform: position > index ? 'scale(1.5)' : ''
            }} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
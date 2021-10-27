import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const numberOfArrows = 10;
  const ARROWS = {
    38: '\u2191', 
    39: '\u2192', 
    40: '\u2193', 
    37: '\u2190',
  };

  const [arrows, setArrows] = useState([]);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // cleanup this component
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

  const generateArrows = () => {
    const newArrows = []
    for (let i = 0; i < numberOfArrows ; i++) {
      newArrows.push(ARROWS[Math.floor(Math.random() * (40 - 37 + 1) + 37)])
    }
    setNewArrowsState(newArrows);
  }

  const handleKeyDown = (event) => {
    //up arrow key code: 38
    //right arrow key code: 39
    //down arrow key code: 40
    //left arrow key code: 37
    if (![38, 39, 40, 37].includes(event.keyCode)) return;
    const keyToArrow = ARROWS[event.keyCode];
    if (arrowsRef.current.length === 0 || (positionRef.current === (numberOfArrows - 1) && arrowsRef.current[positionRef.current] === keyToArrow)) {
      generateArrows();
      setNewPositionState(0);
      return;
    }
    if (arrowsRef.current[positionRef.current] === keyToArrow) {
      // match 
      setNewPositionState(positionRef.current + 1);
    } else {
      setNewPositionState(0);
    }
    console.log(positionRef.current)
  };

  return (
    <div className="App">
      <div>
        Press any arrow key to start!
      </div>
      <div>
        {arrows.map((arrow, index) => (
          <span key={index} style={{display: position > index ? 'none' : ''}}>{arrow}</span>
        ))}
      </div>
    </div>
  );
}

export default App;

/*
- press any key to start
- on handle key function we need to 
  - generate arrows if they are starting OR they get the last arrow correct
  - need to check if their key press matches the arrow
    - if match then go to next arrow
    - if no match, restart the row
*/
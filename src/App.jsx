import React, { useState } from "react";
import "./App.css";
import DragMove from "./DragMove";

function App() {
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0
  });

  const handleDragMove = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY
    });
  };

  return (
    <div className="App">
              <DragMove onDragMove={handleDragMove}>
          <div
            style={{
              transform: `translateX(${translate.x}px) translateY(${translate.y}px)`
            }}
          >
            <div style={{
              height: "100px",
              width: "200px",
              backgroundColor:"#000",
              alignContent:"center",
              justifyContent:"center"
            }}
            className="App-logo"
            >
              <p>Drap and Drop Sticker</p>
            </div>
          </div>
        </DragMove>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';

const canvasStyles = {
    width:"500px",
    height:"500px",
    border: "1px solid #999",
    margin: "10px auto",
    display: "block",
   }

class CanvasComponent extends React.Component {

  componentDidMount() {
    this.setupCanvas();
  }

  setupCanvas(){
    let canvas = document.getElementById("board");
    let ctx = this.canvas.getContext("2d");
    this.setState({
      originalPosition: {},
      playerPosition: { x: 250, y: 250 },
      // ballPosition: newBallPosition(),
      direction: "right",
      speed: 200,
  });
}

  render() {
    return (
      <canvas style={canvasStyles} id="board" />
    );
  }
}

export default CanvasComponent;

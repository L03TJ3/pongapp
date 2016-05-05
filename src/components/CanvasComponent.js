import React from 'react';
import ReactDOM from 'react-dom';
import ReactCanvas from 'react-canvas';

const Surface = ReactCanvas.Surface;
const Image = ReactCanvas.Image;
const Text = ReactCanvas.Text;
const ball = require("../images/ball.jpg");

class CanvasComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      newPos: null
    };
    this.speed = 30;
  }

  componentDidMount(){
    this.repaint();
    this.moveBall();
  }

  moveBall(){
    if (this.state.newPos === null) {
      console.log(ball);
      this.state.newPos = this.props.game.ball.position;
    }
    if (this.state.newPos === null) {
      return;
    }

    let currentPos = this.state.newPos;
    let calcX = this.props.game.ball.calcX;
    let calcY = this.props.game.ball.calcY;
    let newX = currentPos.x + calcX;
    let newY = currentPos.y + calcY;

    if (newX >= 800 || newX <= 0) {
      newX = Math.max(currentPos.x -calcX, 10);
      calcX = -calcX;
    }

    if (newY >= 500 || newY <= 0) {
      newY = Math.max(currentPos.y -calcY, 10);
      calcY = -calcY;
    }

    this.setState({
      newPos: {
        x: newX,
        y: newY,
      }
    });

    if (calcX !== this.props.game.ball.calcX ||
          calcY !== this.props.game.ball.calcY) {
        this.props.onChange(this.props.game, {
          ball: {
            position: this.state.newPos,
            calcX: calcX,
            calcY: calcY,
          }
        });
      }

      window.setTimeout(function(){
        this.moveBall();
      }.bind(this), this.speed);
  }

  drawBall() {
    let position = this.state.newPos;
    if (position === null) {
      return;
    }
  }

  repaint() {
    this.drawBall();
    window.setTimeout(function() {
      this.repaint();
    }.bind(this), 5);
  }

  getImageHeight(){
    return Math.round(window.innerHeight / 2);
  }

  getImageStyle(){
    let position = this.state.newPos;

    if (position == null) {
      position = {
        x: 0,
        y: 0,
      };
    }

    return {
      top: position.y,
      left: position.x,
      width: 50,
      height: 50,
    };
  }

  getTextStyle(){
    return {
      top: 10,
      left: 200,
      width: 500,
      height: 20,
      lineHeight: 20,
      fontSize: 12,
    };
  }

  render() {
    let surfaceWidth = 500;
    let surfaceHeight = 500;
    let surfaceBorder = 1;
    let imageStyle = this.getImageStyle();
    let textStyle = this.getTextStyle();

    return (
    <div className='canvas' style={{border: '1px solid black',
    width: 500, height: 500, 'marginLeft': 200}}>
      <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
        <Image style={imageStyle} src={ball} />
      </Surface>
    </div>
    );
  }
}

export default CanvasComponent;

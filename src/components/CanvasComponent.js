import React from 'react';
import ReactDOM from 'react-dom';
import ReactCanvas from 'react-canvas';

const Surface = ReactCanvas.Surface;
const Image = ReactCanvas.Image;
const Text = ReactCanvas.Text;
const ball = require("../images/ball.jpg");
const battOne = require("../images/batone.png");
const battTwo = require("../images/battwo.png");


class CanvasComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      newPos: null,
      newPosOneBat: null,
      newPosTwoBat: null
    };
    this.speed = 50;
  }

  componentDidMount(){
    this.repaint();
    this.moveBall();
    window.addEventListener('keydown', this.moveBat.bind(this));
}

  moveBat(event){
  let position = this.props.game.playerOneBat.position;
  let positionTwo = this.props.game.playerTwoBat.position;

    if (event.keyCode == '38') {
      event.preventDefault();

      if (position.y <= 0) {
        return;
      }
      else {
        position.y -= 10;
        this.setState({
          newPosOneBat: {
            x: position.x,
            y: position.y
          }
        });
      }

  }
    if (event.keyCode == '40') {
      event.preventDefault();
      if (position.y >= 400) {
        return;
      }
      else {
        position.y += 10;
        this.setState({
          newPosOneBat: {
            x: position.x,
            y: position.y
          }
        });
      }
    }

    if (event.keyCode == '87') {
      event.preventDefault();
      if (positionTwo.y <= 0) {
        return;
      }
      else {
        positionTwo.y -= 10;
        this.setState({
          newPosTwoBat: {
            x: positionTwo.x,
            y: positionTwo.y
          }
        });
      }
    }

    if (event.keyCode == '83') {
      event.preventDefault();
      if (positionTwo.y >= 400) {
        return;
      }
      else {
        positionTwo.y += 10;
        this.setState({
          newPosTwoBat: {
            x: positionTwo.x,
            y: positionTwo.y
          }
        });
      }
    }
}

  moveBall(){
    if (this.state.newPos === null) {
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
    let batPos = this.props.game.playerOneBat.position;

    if (newX >= 760 || newX <= 40 ) {
      if ( this.hitsBall(newX, newY)){
        let hitDistance = this.hitPosition(newY);

        newX = Math.max(currentPos.x -calcX, 10);
        calcX = -calcX;
        calcY = hitDistance;
      }
      else if ( this.hitsBallTwo(newX, newY)){
        let hitDistance = this.hitPositionTwo(newY);

        newX = Math.max(currentPos.x -calcX, 10);
        calcX = -calcX;
        calcY = hitDistance;
      }
      else {
        // window.alert("start again");
        this.props.game.ball.calcY = 0;
        this.setState({
          newPos: {
            x: 400,
            y: 250,
          }
        });
        return this.moveBall();
      }

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

  hitsBall(x, y) {
    let batPosition = this.props.game.playerOneBat.position;
    return batPosition.y - 40 < y && batPosition.y + 40 > y;
  }

  hitPosition(y){
    let batPosition = this.props.game.playerOneBat.position;
    return batPosition.y - y;
  }

  hitsBallTwo(x, y) {
    let batPosition = this.props.game.playerTwoBat.position;
    return batPosition.y - 40 < y && batPosition.y + 40 > y;
  }

  hitPositionTwo(y){
    let batPosition = this.props.game.playerTwoBat.position;
    return batPosition.y - y;
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

  getBallStyle(){
    let position = this.state.newPos;

    if (position == null) {
      position = {
        x: 250,
        y: 250,
      };
    }

    return {
      top: position.y,
      left: position.x,
      width: 50,
      height: 50,
    };
  }

  getBatOneStyle(){
    let batPosOne = this.props.game.playerOneBat.position;
    return {
      top: batPosOne.y,
      left: batPosOne.x,
      width: 100,
      height: 100
    };
  }

  getBatTwoStyle(){
    let batPosTwo = this.props.game.playerTwoBat.position;

    return {
      top: batPosTwo.y,
      left: batPosTwo.x,
      width: 100,
      height: 100
    }
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
    let surfaceWidth = 800;
    let surfaceHeight = 500;
    let surfaceBorder = 1;
    let ballStyle = this.getBallStyle();
    let textStyle = this.getTextStyle();
    let batOneStyle = this.getBatOneStyle();
    let batTwoStyle = this.getBatTwoStyle();

    return (
    <div className='canvas' style={{border: '1px solid black',
    width: 800, height: 500, 'marginLeft': 200}}>
      <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
        <Image style={ballStyle} src={ball} />
        <Image style={batOneStyle} src={battOne} />
        <Image style={batTwoStyle} src={battTwo} />

      </Surface>
    </div>
    );
  }
}

export default CanvasComponent;

import BaseModel from './BaseModel';

class GameModel extends BaseModel {
  defaults() {
    return {
      playerOne: null,
      playerTwo: null,
      playerOneBat: {
        position: {
          x: 250,
          y: 0
        }
      },
      playerTwoBat: {
        position: {
          x: 250,
          y: 0
        }
      },
      ball: {
        position: {
          x: 250,
          y: 250
        },
        calcX: 0,
        calcY: 15
      },
      winner: null
    };
  }

  constructor() {
    super('ponggame');
  }
}

export default GameModel;

import BaseModel from './BaseModel';

class GameModel extends BaseModel {
  defaults() {
    return {
      playerOne: null,
      playerTwo: null,
      playerOneBat: {
        position: {
          x: 10,
          y: 220
        }
      },
      playerTwoBat: {
        position: {
          x: 690,
          y: 220
        }
      },
      ball: {
        position: {
          x: 250,
          y: 250
        },
        calcX: 15,
        calcY: 0
      },
      winner: null
    };
  }

  constructor() {
    super('ponggame');
  }
}

export default GameModel;

import React from 'react';
import GameModel from './models/GameModel';
import NewPlayerComponent from './components/NewPlayerComponent';
import NewGameComponent from './components/NewGameComponent';
import GameListComponent from './components/GameListComponent';
import PlayerMoveComponent from './components/PlayerMoveComponent';
import Utils from './lib/Utils';
import CanvasComponent from './components/CanvasComponent';

class App extends React.Component {
  constructor() {
    super();

    this.games = new GameModel();
    this.games.subscribe(this.updateList.bind(this));
    this.utils = new Utils();

    let playerStorage = this.utils.store("player.player");
    if (playerStorage.length === 0) {
      playerStorage = null;
    }

    this.state = {
      games: [],
      currentGame: null,
      currentPlayer: playerStorage,
      playerMove: "" ,


    };
  }

  updateList() {
    this.setState({
      games: this.games.resources
    });

    if (this.state.currentGame !== null) {
      let component = this;
      this.games.resources.map(function(game) {
        if (game._id === component.state.currentGame._id) {
          component.setState({
            currentGame: game
          });
        }
      });
    }
  }

  setPlayer(player) {
    this.setState({
      currentPlayer: player
    });
    this.utils.store("pong.player", player);
  }

  createGame() {
    this.games.addResource({
      playerOne: this.state.currentPlayer
    });
  }

  joinGame(game) {
    console.log("Joining game...");
    if (game.playerOne === this.state.currentPlayer || game.playerTwo === this.state.currentPlayer || game.playerTwo === null) {
      if (game.playerOne !== this.state.currentPlayer && game.playerTwo !== this.state.currentPlayer) {
        console.log("Joining game as player two...");
        this.games.save(game, { playerTwo: this.state.currentPlayer });
      }

      this.setState({
        currentGame: game
      });
    } else {
      window.alert("Can't touch this dung dung dung dung");
    }
  }

  clearCurrentGame() {
    this.setState({
      currentGame: null
    });
  }

  saveGame(game, props) {
    this.games.save(game, props);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Pong</h1>
        { this.state.currentPlayer !== null &&
          <p>Hi, {this.state.currentPlayer}</p> }

        { this.state.currentPlayer === null &&
          <NewPlayerComponent onCreate={this.setPlayer.bind(this)}/> }

        { this.state.currentGame === null &&
          <GameListComponent games={this.state.games} currentPlayer={this.state.currentPlayer} onSelect={this.joinGame.bind(this)}/> }

        { this.state.currentPlayer && this.state.currentGame === null &&
          <NewGameComponent onCreate={this.createGame.bind(this)}/> }

          { this.state.currentGame !== null &&
              <CanvasComponent game={this.state.currentGame} player={this.state.currentPlayer}  onChange={this.saveGame.bind(this)}/>}

        <div>
           <button onClick={this.clearCurrentGame.bind(this)}>Back</button>
         </div>

    </div>
    );
  }
}

export default App;

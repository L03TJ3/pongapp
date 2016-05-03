import React from 'react';

class PlayerMoveComponent extends React.Component {
  makeMove() {
    this.props.onClick(this.props.move);
  }

  render() {
    return (
      <button onClick={this.makeMove.bind(this)}>{this.props.move}</button>
    );
  }
}

export default PlayerMoveComponent;

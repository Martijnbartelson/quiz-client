import React, { Component } from 'react'

class Finished extends Component {
    render () {
        return (
            <div className="finished">
                <h1 className="game-shout">The game is finished.</h1>
                <h1>{this.props.game.winner === 'a' ? this.props.game.players[0].user.name : this.props.game.players[1].user.name } won!</h1>
                <h2>{this.props.game.players[0].user.name}: {this.props.game.scores.a} points</h2>
                <h2>{this.props.game.players[1].user.name}: {this.props.game.scores.b} points</h2>
            </div>
        )
    }
}

export default Finished
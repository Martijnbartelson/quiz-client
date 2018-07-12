import React, { Component } from 'react'

class Finished extends Component {
    render () {
        return (
            <div>
                <h1 className="game-shout">The game is finished</h1>
                <h2>Player {this.props.game.winner} won!</h2>
                <p>Player a score: {this.props.game.scores.a}</p>
                <p>Player b score: {this.props.game.scores.b}</p>
            </div>
        )
    }
}

export default Finished
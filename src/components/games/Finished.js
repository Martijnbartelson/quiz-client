import React, { Component } from 'react'

class Finished extends Component {
    render () {
        return (
            <div className="finished">
                <h1 className="game-shout">The game is finished.</h1>
                <h1>Player {this.props.game.winner} won!</h1>
                <h2>Player a score: {this.props.game.scores.a}</h2>
                <h2>Player b score: {this.props.game.scores.b}</h2>
            </div>
        )
    }
}

export default Finished
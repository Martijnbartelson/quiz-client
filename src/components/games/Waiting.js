import React, { Component } from 'react'

class Waiting extends Component {
    render () {
        return (
            <div>
                <h1 className="game-shout">Waiting for an other player to join the game</h1>
                <div className="loader">Loading...</div>
            </div>
        )
    }
}

export default Waiting
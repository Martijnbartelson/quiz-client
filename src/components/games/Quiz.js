import React, { Component } from 'react'
import { updateGame} from '../../actions/games'
import {connect} from 'react-redux'

class Quiz extends Component {
   
    
    handleClick = (answer) => {
       // dispatch action.. patch /games/:id .. gameId / update
       let {game} = this.props
       let update = {
            answer,
            player: 'a',
            question: game.currentQuestion
       }
       this.props.updateGame(game.id, update)
            
    }
   
    render () {
        const {game} = this.props
        console.log(game);
        if (game === null) return 'Loading...'
      
        return (
            <div>
                {/* Question */}
                <h1>{ game.questions[game.currentQuestion].question }</h1>

                {/* Answer */}
                { game.questions[game.currentQuestion].answers.map(answer=><button onClick={()=>this.handleClick(answer.answer)} key={answer.answer}>{answer.answer}</button>)}
                <h2>Your score: {game.scores.a}</h2>
                <h2>Player 2 score: {game.scores.b}</h2>
            </div>
        )
    }
}


export default connect(null, {updateGame})(Quiz)
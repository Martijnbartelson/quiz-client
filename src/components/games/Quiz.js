import React, { Component } from 'react'

class Quiz extends Component {
    render () {
        const {game} = this.props
        console.log(game);
      
        return (
            <div>
                <h1>This is the Quiz</h1>
                <p>{game.status}</p>
                {/* Question */}
                <h2>{ game.questions[0].question }</h2>

                {/* Answer */}
                { game.questions[0].answers.map(answer=><button>{answer.answer}</button>)}
            </div>
        )
    }
}

export default Quiz
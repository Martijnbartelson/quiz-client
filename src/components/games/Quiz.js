import React, { Component } from 'react'
import { updateGame} from '../../actions/games'
import {connect} from 'react-redux'
import {Button} from '../styledComponents'
import ReactCountdownClock from 'react-countdown-clock'
import {userId} from '../../jwt'


class Quiz extends Component {
    state={
        seconds:15,
        timer: true,
        question: true,
        answer: true,
        feedback: false,
    }

    componentDidUpdate(prevProps){
        if(prevProps.game.currentQuestion!==this.props.game.currentQuestion){

            // TODO set time out to delay the start of the next question
            // Hide the question and the answers for x seconds. 
            // Show the message and the scores for x seconds.

            setTimeout(()=>{
                this.setState((prevState, props) => ({
                        seconds: prevState.seconds + 0.00001,
                        timer: true,
                        question: true,
                        answer: true,
                        feedback: false
                    }))    
            }, 3000);    
        }     
    }

    handleClick = answer => {
        let {game,user} = this.props
        let update = {
                answer,
                player: user.id === game.players[0].user.id ? 'a' : 'b',
                question: game.currentQuestion
        }
        this.props.updateGame(game.id, update)
        this.setState({
            timer: false,
            question: false,
            answer: false,
            feedback: true
        })         
    }

    handleTimout = () => {
        let {game,user} = this.props
        let update = {
                answer: 'timeout',
                player:  user.id === game.players[0].user.id ? 'a' : 'b',
                question: game.currentQuestion
        }
        this.props.updateGame(game.id, update)         
        }

    render () {
        const {game} = this.props
        const {question,answer,timer,feedback} = this.state
        console.log(game);
        if (game === null) return 'Loading...'

        return (
            <div>
                <p>Status: {game.status}</p>
                <p>Question {game.currentQuestion+1}/10</p>
                { question && 
                    <div>
                        <h1>{ game.questions[game.currentQuestion].question }</h1>
                    </div>}

                { answer && <div>
                    { game.questions[game.currentQuestion].answers.map(answer=><Button onClick={()=>this.handleClick(answer.answer)} key={answer.answer}>{answer.answer}</Button>)}
                </div> }

                <div>
                    <h2>Player a score: {game.scores.a}</h2>
                    <h2>Player b score: {game.scores.b}</h2>
                </div>

                { timer && <div>
                    <ReactCountdownClock seconds={this.state.seconds}
                        color="#000"
                        alpha={0.9}
                        size={300}
                        onComplete={this.handleTimout}/>
                </div> }       

                { feedback && <div>
                    <h2>{ game.scores.message }</h2>
                </div>   } 
            </div>
        )
    }
}

const mapStateToProps = state => ({
user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
})


export default connect(mapStateToProps, {updateGame})(Quiz)
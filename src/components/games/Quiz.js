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
            console.log('question answered');
            this.setState({
                timer: false,
                question: false,
                answer: false,
                feedback: true
            })       
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
        this.setState({
            timer: false,
            question: false,
            answer: false,
            feedback: true
        })         
    }

    render () {
        const {game} = this.props
        const {question,answer,timer,feedback} = this.state
        if (game === null) return 'Loading...'

        return (
            <div>
                <p className="questions">Question {game.currentQuestion+1}/10</p>
                { question && 
                    <div className="question">
                        <h1>{ game.questions[game.currentQuestion].question }</h1>
                    </div>}

                <div className="middle">
                    <div className="score-board-a">
                        <h1>{game.players[0].user.name}: {game.scores.a} points</h1>
                    </div>

                    { timer && <div>
                        <ReactCountdownClock seconds={this.state.seconds}
                            color="#000"
                            alpha={0.9}
                            size={250}
                            onComplete={this.handleTimout}/>
                    </div> }

                    <div className="score-board-b">
                        <h1>{game.players[1].user.name}: {game.scores.b} points</h1>
                    </div>
                </div>    


                { answer && <div className="answer">
                    { game.questions[game.currentQuestion].answers.map(answer=><Button onClick={()=>this.handleClick(answer.answer)} key={answer.answer}>{answer.answer}</Button>)}
                </div> }       

                { feedback && <div className="feedback">
                    <h1>{ game.scores.message }</h1>
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
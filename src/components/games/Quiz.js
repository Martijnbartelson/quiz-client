import React, { Component } from 'react'
import { updateGame} from '../../actions/games'
import {connect} from 'react-redux'
import {ButtonB} from '../styledComponents'
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

        function createQ() {
            return {__html: game.questions[game.currentQuestion].question};
          }
         
          function createA(answer) {
            return {__html: answer};
          }
          function shuffle(arra1) {
            var ctr = arra1.length, temp, index;
        
        // While there are elements in the array
            while (ctr > 0) {
        // Pick a random index
                index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
                ctr--;
        // And swap the last element with it
                temp = arra1[ctr];
                arra1[ctr] = arra1[index];
                arra1[index] = temp;
            }
            return arra1;
        }

        return (
            <div>
                <p className="questions">Question {game.currentQuestion+1}/10</p>
                { question && 
                    <div className="question">
                        <h1 dangerouslySetInnerHTML={ createQ()}></h1>
                    </div>}

                <div className="middle">
                    <div className="score-board-a">
                        <h1>{game.players[0].user.name}: {game.scores.a} points</h1>
                    </div>

                    { timer && <div>
                        <ReactCountdownClock seconds={this.state.seconds}
                            color="#d07575"
                            alpha={0.9}
                            size={250}
                            onComplete={this.handleTimout}/>
                    </div> }

                    <div className="score-board-b">
                        <h1>{game.players[1].user.name}: {game.scores.b} points</h1>
                    </div>
                </div>    


                { answer && <div className="answer">
                    { shuffle(game.questions[game.currentQuestion].incorrect_answers)
                        
                        .map(answer=><ButtonB onClick={()=>this.handleClick(answer)} key={answer}><p dangerouslySetInnerHTML={ createA(answer)}></p></ButtonB>)}
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
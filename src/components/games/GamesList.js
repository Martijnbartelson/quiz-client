import './GamesList.css'
import React, {PureComponent} from 'react'
import {getGames, createGame, joinGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
// import { BrowserRouter as Redirect } from 'react-router-dom'

class GamesList extends PureComponent {
	state={newgame:false}
	componentWillMount() {
		
		if (this.props.authenticated) {
			if (this.props.games === null) this.props.getGames()
			if (this.props.users === null) this.props.getUsers()
		}
	}

	componentDidUpdate(){
		// if ( prevProps.games !== this.props.games ) {
			this.props.getGames()
			// console.log(prevProps.games)
			// console.log(this.props.games)
		// }
	
	}
	
	newgame = () =>{
		this.setState({newgame:true})
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]:e.currentTarget.value
		})
		console.log(this.state);
		
	}


	renderGame = (game) => {
		const {history} = this.props
		// console.log("game - ID ???: " + game.id)
		const joinAndRedirect = () => {
			this.props.joinGame(game.id)
			history.push(`/games/${game.id}`)
		}

		return (<Card key={game.id} className="game-card">
		<CardContent>
		<Typography variant="headline" component="h2">
			Game #{game.id}
			</Typography>
			<Typography color="textSecondary">
			This game is joined by&nbsp;
			{
				game.players
				.map(player => player.user.name)
				.join(' and ')
			}
			</Typography>
			<Typography color="textSecondary">
			Status: {game.status}
			</Typography>
		</CardContent>

		<CardActions>
			
			<Button size="small"
			onClick={joinAndRedirect} > 
			Join Game 
			</Button>

		</CardActions>
		</Card>)
	}

	render() {
		const {games, users, authenticated, history} = this.props
	
		if (!authenticated){history.push(`/login`)}

		const funcOne = () => {
			this.props.createGame()
		}

		const funcTwo = () => {
			history.push(`/games/${this.props.games[0].id}`)
		}		
      
		const createAndRedirect = () => {
			this.props.createGame({category:this.state.category,difficulty: this.state.difficulty})
			funcOne()
			setTimeout(funcTwo, 300)
		}

		return (
		<div>
		<Paper className="outer-paper">

		<Button
			color="primary"
			variant="raised"
			onClick={this.newgame}
			// onClick={ funcOne() }
			className="create-game"
		>

			{/* <Button 
			onClick={ funcTwo() }> */}
				Create Game
			{/* </Button> */}

		</Button>

		<h2 className="join-game">Or join a game:</h2>
		<div>
			{games.map(game => this.renderGame(game))}
		</div>
		</Paper>
		{ this.state.newgame && <div className="addScreen">
			<div className="newGameForm">
				<form>
					<h2>Categories</h2>
					<label>
						<input type="radio" name='category' 
						value="11" 
						onChange={this.handleChange}> 
						</input>Films
					</label>
					<label>
						<input type="radio" name='category' 
						value="12" 
						onChange={this.handleChange}> 
						</input>Music
					</label>  
          		</form>
				  <form>
					<h2>Difficulty</h2>
					<label>
						<input type="radio" name='difficulty' 
						value="easy" 
						onChange={this.handleChange}> 
						</input>Easy
					</label>
					<label>
						<input type="radio" name='difficulty' 
						value="medium" 
						onChange={this.handleChange}> 
						</input>Medium
					</label>  
					<label>
						<input type="radio" name='difficulty' 
						value="hard"
						onChange={this.handleChange}> 
						</input>Hard
					</label> 
					<Button
						color="primary"
						variant="raised"
						onClick={createAndRedirect}
						className="create-game"
					>Create Game</Button>
          		</form>
			</div>
			</div>}
		</div>	
	)
  }
}

const mapStateToProps = (state, props) => ({
	authenticated: state.currentUser !== null,
	users: state.users === null ? null : state.users,
	games: state.games === null ? null : Object.values(state.games).sort((a, b) => b.id - a.id),
})

export default connect(mapStateToProps, {getGames, getUsers, createGame, joinGame})(GamesList)

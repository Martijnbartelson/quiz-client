import './GamesList.css'
import React, {PureComponent} from 'react'
import {getGames, createGame, joinGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { BrowserRouter as Redirect } from 'react-router-dom'

class GamesList extends PureComponent {
	
	componentWillMount() {
		
		if (this.props.authenticated) {
			if (this.props.games === null) this.props.getGames()
			if (this.props.users === null) this.props.getUsers()
		}
	}
	
	renderGame = (game) => {
		const {history} = this.props
		const joinAndRedirect = () => {
			this.props.joinGame(game.id)
			history.push(`/games/${game.id}`)
		}

		return (<Card key={game.id} className="game-card">
		<CardContent>
			<Typography color="textSecondary">
			This game is played by&nbsp;
			{
				game.players
				.map(player => player.user.name)
				.join(' and ')
			}
			</Typography>
			<Typography variant="headline" component="h2">
			Game #{game.id}
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
		console.log(authenticated);
		
		if (!authenticated) {history.push(`/login`)}

		if (games === null || users === null) return null
		
		const createAndRedirect = () => {
			this.props.createGame()
			let newId = this.props.games[0].id + 1
			history.push(`/games/${newId}`)
		}

		return (<Paper className="outer-paper">
		<Button
			color="primary"
			variant="raised"
			onClick={createAndRedirect}
			className="create-game">
				Create Game
		</Button>

		<h2>Or join a game:</h2>
		<div>
			{games.map(game => this.renderGame(game))}
		</div>
		</Paper>)
  }
}

const mapStateToProps = (state, props) => ({
	authenticated: state.currentUser !== null,
	users: state.users === null ? null : state.users,
	games: state.games === null ? null : Object.values(state.games).sort((a, b) => b.id - a.id),
})

export default connect(mapStateToProps, {getGames, getUsers, createGame, joinGame})(GamesList)

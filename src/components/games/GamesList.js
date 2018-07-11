import React, {PureComponent} from 'react'
import {getGames, createGame, joinGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import './GamesList.css'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import GameDetails from "./GameDetails"
import { withRouter } from 'react-router-dom'

class GamesList extends PureComponent {
	
	componentWillMount() {
		if (this.props.authenticated) {
		if (this.props.games === null) this.props.getGames()
		if (this.props.users === null) this.props.getUsers()
		if (this.props.gamez === null) this.props.getGames()
		}
	}

	

	joinAndRedirect = () => {
		
	}

	// <Route exact path="/" render={ () => <Redirect to="/games" /> } />
	// joinGame = () => this.props.joinGame(this.props.game.id)
	
	renderGame = (game) => {
		const {users, history} = this.props


		return (<Card key={game.id} className="game-card">
		<CardContent>
			<Typography color="textSecondary">
			This game is played by&nbsp;
			{/* {
				game.players
				.map(player => users[player.userId].firstName)
				.join(' and ')
			} */}
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
			onClick={ () => { history.push(`/games/${game.id}`) }} > 
			Join A Game 
			</Button>

		</CardActions>
		</Card>)
	}

	render() {
		const {games, users, authenticated, createGame, history, game} = this.props
		const createAndRedirect = () => {
			this.props.createGame()
			history.push(`/games/${games[games.length-1].id}`)
		}

		if (!authenticated) return (
				<Redirect to="/login" />
		)

		if (games === null || users === null) return null

		return (<Paper className="outer-paper">
		<Button
			color="primary"
			variant="raised"
			onClick={createAndRedirect}
			className="create-game"
		>
			Create Game
		</Button>

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
//   game: state.games && state.games[props.match.params.id],
})

export default connect(mapStateToProps, {getGames, getUsers, createGame})(GamesList)

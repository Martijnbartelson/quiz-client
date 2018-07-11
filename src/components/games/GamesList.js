import React, {PureComponent} from 'react'
import {getGames, createGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
// import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import './GamesList.css'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import GameDetails from "./GameDetails"
import { withRouter } from 'react-router-dom'


class GamesList extends PureComponent {

	Button = withRouter(({ history }) => (
		<button
		type='button'
		onClick={ () => { history.push('/games/${game.id}') }}
		>
		Join A Game
		</button>
	))

	componentWillMount() {
		if (this.props.authenticated) {
		if (this.props.games === null) this.props.getGames()
		if (this.props.users === null) this.props.getUsers()
		if (this.props.gamez === null) this.props.getGames()
		}
	}

	// componentDidMount() {
	// 		console.log("props.games: " + Object.values(this.props.gamezzz))
	// }

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
		{/* <CardActions>
			<Button
			size="small"
			onClick={() => history.push(`/games/${game.id}`)}
			>
			Watch
			</Button>
		</CardActions> */}
		<Router>
		<CardActions>
			
			<Button>
			{/* <Route exact path="/" component={GameDetails} render={ () => <Redirect to={`/games/${game.id}`} /> } /> */}
			{/* <Route exact path="/games" component={GameDetails} /> */}
			Join A Game
			</Button>

		</CardActions>
		</Router>
		</Card>)
	}

		// import { withRouter } from 'react-router-dom'
		// // this also works with react-router-native

		// const Button = withRouter(({ history }) => (
		// <button
		// type='button'
		// onClick={() => { history.push('/new-location') }}
		// >
		// Click Me!
		// </button>
		// ))

	render() {
		const {games, users, authenticated, createGame} = this.props

		if (!authenticated) return (
				<Redirect to="/login" />
		)

		if (games === null || users === null) return null

		return (<Paper className="outer-paper">
		<Button
			color="primary"
			variant="raised"
			onClick={createGame}
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

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  games: state.games === null ? null : Object.values(state.games).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, {getGames, getUsers, createGame})(GamesList)

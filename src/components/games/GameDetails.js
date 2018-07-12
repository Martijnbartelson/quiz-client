import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, updateGame, joinGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Waiting from './Waiting'
import './GameDetails.css'
import Finished from './Finished';
import Quiz from './Quiz';

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  render() {
    const { game, users, authenticated } = this.props
	
    if (!authenticated) return (<Redirect to="/login" />)
    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    return (
      <div>
        <h2 className="game-title">Game #{game.id}</h2>
        { game.status === 'pending' && <Waiting/> }
        { game.status === 'started' && <Quiz game={game}/> }
        { game.status === 'finished' && <Finished game={game}/> }

      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[Number(props.match.params.id)],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)

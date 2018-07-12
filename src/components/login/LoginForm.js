import React, {PureComponent} from 'react'
import './LoginForm.css'
import {Button} from  '../styledComponents'

export default class LoginForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
      <div className="login-form">
				<img src={require('../../img/logo.png')} alt="logo" width="400"/>
  			<form onSubmit={this.handleSubmit}>
  				<label>
            Email
            <input type="email" name="email" value={
  						this.state.email || ''
  					} onChange={ this.handleChange } />
          </label>

  				<label>
            Password
            <input type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
          </label>

  				<Button className="btn-right" type="submit">Login</Button>
  			</form>
		  </div>)
	}
}

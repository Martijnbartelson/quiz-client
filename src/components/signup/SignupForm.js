import React, {PureComponent} from 'react'
import './SignupForm.css'
import {Button} from  '../styledComponents'

export default class SignupForm extends PureComponent {
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
      <div className="signup-form">
				<img src={require('../../img/logo.png')} alt="logo" width="400"/>
  			<form onSubmit={this.handleSubmit}>
					<label>
							Name
							<input type="name" name="name" value={
								this.state.name || ''
							} onChange={ this.handleChange } />
          </label>
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

  				<label>
            Confirm password
  					<input type="password" name="confirmPassword" value={
  						this.state.confirmPassword || ''
  					} onChange={ this.handleChange } />
  				</label>

  				{
  					this.state.password &&
  					this.state.confirmPassword &&
  					this.state.password !== this.state.confirmPassword &&
  					<p style={{color:'red'}}>The passwords do not match!</p>
  				}

  				<Button className="btn-right" type="submit">Sign up</Button>
  			</form>
      </div>
		)
	}
}

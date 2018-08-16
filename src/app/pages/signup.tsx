import Router from 'next/router'
import React, { Component } from 'react'
import App from '../components/App'
import { signUp } from '../service/auth'

export default class Signup extends Component<{}, { nickname?: string; email?: string; password?: string }> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  public signUp() {
    const { nickname = '', email = '', password = '' } = this.state
    signUp({ nickname, email, password })
      .then(() => this.setState({ nickname: undefined, email: undefined, password: undefined }))
      .then(() => Router.router.push('/'))
      .catch(e => alert(e.message))
  }

  public render() {
    return (
      <App>
        <React.Fragment>
          <h2>signup</h2>
          <label>
            nickname <input type={'text'} onChange={e => this.setState({ ...this.state, nickname: e.target.value })} />
          </label>
          <label>
            email <input type={'email'} onChange={e => this.setState({ ...this.state, email: e.target.value })} />
          </label>
          &nbsp;
          <label>
            password{' '}
            <input type={'password'} onChange={e => this.setState({ ...this.state, password: e.target.value })} />
          </label>
          <br />
          <button onClick={() => this.signUp()}>sign up</button>
        </React.Fragment>
      </App>
    )
  }
}

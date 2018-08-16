import Router from 'next/router'
import React, { Component } from 'react'
import App from '../components/App'
import { signIn } from '../service/auth'

export default class Signup extends Component<{}, { email?: string; password?: string }> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  public signIn() {
    const { email = '', password = '' } = this.state
    signIn({ email, password })
      .then(() => this.setState({ email: undefined, password: undefined }))
      .then(() => Router.router.push('/'))
      .catch(e => alert(e.message))
  }

  public render() {
    return (
      <App>
        <React.Fragment>
          <h2>signin</h2>
          <label>
            email <input type={'email'} onChange={e => this.setState({ ...this.state, email: e.target.value })} />
          </label>
          &nbsp;
          <label>
            password{' '}
            <input type={'password'} onChange={e => this.setState({ ...this.state, password: e.target.value })} />
          </label>
          <br />
          <button onClick={() => this.signIn()}>sign in</button>
        </React.Fragment>
      </App>
    )
  }
}

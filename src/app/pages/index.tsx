import React, { Component } from 'react'
import App from '../components/App'
import { listenAuthStateChange, signIn, signOut, signUp } from '../service/auth'

export default class Index extends Component<{}, { user?: any; email?: string; password?: string }> {
  public static async getInitialProps({ req, query }) {
    console.log(req)
    return {}
  }

  constructor(props) {
    super(props)
    this.state = { user: undefined }
  }

  public componentDidMount() {
    listenAuthStateChange(s => {
      this.setState({
        user: s
      })
    })
  }

  public signUp() {
    const { email = '', password = '' } = this.state
    signUp({ email, password })
      .then(() => this.setState({ email: undefined, password: undefined }))
      .catch(e => alert(e.message))
  }

  public signIn() {
    const { email = '', password = '' } = this.state
    signIn({ email, password })
      .then(() => this.setState({ email: undefined, password: undefined }))
      .catch(e => alert(e.message))
  }

  public render() {
    const u = this.state.user
    return (
      <App>
        {u ? (
          <React.Fragment>
            <button onClick={() => signOut()}>sign out</button>
            <dl>
              <dt>uid</dt>
              <dd>{u.uid}</dd>
              <dt>email</dt>
              <dd>{u.email}</dd>
              <dt>refreshToken</dt>
              <dd>{u.refreshToken}</dd>
            </dl>
          </React.Fragment>
        ) : (
          <React.Fragment>
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
            <button onClick={() => this.signIn()}>sign in</button>
          </React.Fragment>
        )}
      </App>
    )
  }
}

import Link from 'next/link'
import React, { Component } from 'react'
import App from '../components/App'
import { listenAuthStateChange, signOut } from '../service/auth'
import { getUsers } from '../service/user'
import { getToken} from '../service/push'

export default class Index extends Component<{ pathname: any }, { user?: any; users?: any[] }> {
  public static async getInitialProps({ /* req, query */ }) {
    return {}
  }

  constructor(props) {
    super(props)
    this.state = { user: undefined }
  }

  public componentDidMount() {
    listenAuthStateChange(s => {
      this.setState({
        ...this.state,
        user: s
      })
      getUsers().then(users => {
        this.setState({
          ...this.state,
          users: users.filter(user => user.uid !== s.uid)
        })
      })
    })
  }

  public render() {
    const user = this.state.user
    const users = this.state.users || []
    const pathname = this.props.pathname
    return (
      <App>
        {user ? (
          <React.Fragment>
            <button onClick={() => getToken()}>push token</button>
            &nbsp;
            <button onClick={() => signOut()}>sign out</button>
            <dl>
              <dt>name</dt>
              <dd>{user.displayName}</dd>
              <dt>uid</dt>
              <dd>{user.uid}</dd>
              <dt>email</dt>
              <dd>{user.email}</dd>
              <dt>refreshToken</dt>
              <dd>{user.refreshToken}</dd>
            </dl>
            <hr />
            <h3>other user</h3>
            <ul>
              {users.map(u => {
                return <li key={u.uid}>{u.name}</li>
              })}
            </ul>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2>choose signup or signin</h2>
            <Link href={'/signup'}>
              <a className={pathname === '/signup' ? 'is-active' : ''}>Sign Up</a>
            </Link>
            &nbsp;
            <Link href={'/signin'}>
              <a className={pathname === '/signin' ? 'is-active' : ''}>Sign In</a>
            </Link>
          </React.Fragment>
        )}
      </App>
    )
  }
}

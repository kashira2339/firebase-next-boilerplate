import React, { Component } from 'react';
import App from '../components/App';

export default class Index extends Component {
  public static async getInitialProps(/* { req, query } */) {
    return {};
  }

  public render() {
    return (
      <App>
        <p>Index Page</p>
        <button onClick={() => signUp({ email: 'xxxx@gmail.com', password: 'hogehoge0' })}>log in</button>
      </App>);
  }
}

function signUp({ email, password }) {
  // auth.createUserWithEmailAndPassword(email, password)
  //   .catch((error) => {
  //     alert('login error: ' + error);
  //   });
}

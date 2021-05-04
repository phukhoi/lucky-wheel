import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.userData,
      isLoggedIn: props.userIsLoggedIn
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    let appState = {
      isLoggedIn: false,
      user: {}
    };
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);
    this.props.history.push('/login');
  }

  render() {
    const aStyle = {
      cursor: 'pointer'
    };

    return (
      <nav className="navbar">
        <ul>
          <li><Link to="/">Index</Link></li>
          {this.state.isLoggedIn ?
            <div>
              <li className="has-sub"><Link to="/dashboard">Dashboard</Link></li>
              <li className="has-sub"><Link to="/logout">Logout</Link></li>
            </div>
            : ""}
          {!this.state.isLoggedIn ?
            <li><Link to="/login">Login</Link> | <Link to="/register">Register</Link></li> : ""}
        </ul>
      </nav>
    )
  }
}
export default withRouter(Header)
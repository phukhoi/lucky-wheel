import React, { Component } from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import GameTemplate from "../Game/GameTemplate";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {
                "id": 1,
                "name": "Khoi Nguyen"
            }
        }
    }
    // check if user is authenticated and storing authentication data as states if true
    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }

        //get user data
    }
    render() {
        return (
            <div>
                <GameTemplate/>
            </div>
        )
    }
}
export default Home
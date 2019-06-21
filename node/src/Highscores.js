import React from 'react';
import { Navbar } from 'react-bootstrap';
import './App.css';
import Tournament from './Tournament';

class Highscores extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        tournament: {},
        index: 1,
    };
    this.tournaments = [];
  }

  componentDidMount() {
  }

  render() {
    return (
        <div className="App">
            <Navbar bg="light">
                <Navbar.Brand>LAN Tournaments</Navbar.Brand>
            </Navbar>
            <Tournament tournament={this.state.tournament} />
        </div>
    );
  }
}

export default Highscores;

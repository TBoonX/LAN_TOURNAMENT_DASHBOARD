import React from 'react';
import { Navbar } from 'react-bootstrap';
import './App.css';
import Tournament from './Tournament';
import Dexie from 'dexie';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.db = new Dexie("MyDatabase");
    
    this.state = {
        tournament: {},
        index: 1,
    };
    this.tournaments = [];
    
    // Define Database Schema
    this.db.version(1).stores({
        tournaments: "++id, name",
        participants: "++id, name, icon",
        games: "++id, name, icon",
        points: "++id, game, participant, tournament, value",
    });
    
    // Interact With Database
    let that = this;
    this.db.table('tournaments')
      .toArray()
      .then((tournaments) => {
          if (tournaments.length < 1) {
              // Let's add some data to db:
              let tournament1 = that.db.table('tournaments')
                .add({name: 'COD2 Deathmatch'});
              let participant1 = that.db.table('participants')
                .add({name: 'Kurt', icon: 'http://ldap.aksw.org/pic/sn/Junghanns/gn/Kurt'});
              let game1 = that.db.table('games')
                .add({name: 'CoD 2', icon: 'https://tse4.mm.bing.net/th?id=OIP.N8Ti7Cb7RW8MqCxL4JULIAHaHa&pid=Api'});
                
            that.setState({
                index: 0,
            });
          }
      });
  }

  componentDidMount() {
      // Interact With Database
      let that = this;
      // Let's add some data to db:
      let point1 = this.db.table('points')
          .add({game: 1, participant: 1, tournament: 1, value: 1});
      let point2 = this.db.table('points')
          .add({game: 1, participant: 1, tournament: 1, value: 2});
          
          
      this.db.table('tournaments')
        .toArray()
        .then((tournaments) => {
          that.setState({ tournament: tournaments[that.state.index], });
        });
  }

  render() {
    return (
        <div className="App">
            <Navbar bg="light">
                <Navbar.Brand>LAN Tournaments</Navbar.Brand>
            </Navbar>
            <Tournament tournament={this.state.tournament} db={this.db} />
        </div>
    );
  }
}

export default App;

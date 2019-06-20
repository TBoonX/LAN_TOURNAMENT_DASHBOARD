import React from 'react';
import { Navbar } from 'react-bootstrap';
import './App.css';
import Tournament from './Tournament';
import zango from 'zangodb';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    // Define Database Schema
    this.db = new zango.Db("LAN", {
        tournaments: ["name", 'id'],
        participants: ["name, icon", 'id'],
        games: ["name, icon", 'id'],
        points: ["game, participant, tournament, value", 'id'],
    });
    
    this.state = {
        tournament: {},
        index: 1,
    };
    this.tournaments = [];
    
    // Interact With Database
    let that = this;
    this.db.collection('tournaments').find().toArray((e, tournaments) => {
        if (e)
            console.error(e);
        else if (!tournaments || tournaments.length < 1) {
            // Let's add some data to db:
            that.db.collection('tournaments').insert([{name: 'COD2 Deathmatch', id: 1}])
                .then((e) => {
                    return that.db.collection('participants').insert([{name: 'Kurt', icon: 'http://ldap.aksw.org/pic/sn/Junghanns/gn/Kurt', id: 1}]);
                })
                .then((e) => {
                    return that.db.collection('games').insert([{name: 'CoD 2', icon: 'https://tse4.mm.bing.net/th?id=OIP.N8Ti7Cb7RW8MqCxL4JULIAHaHa&pid=Api', id: 1}])
                        .then((e) => console.error(e))
                        .catch((e) => console.error(e));
                })
                .then(() => {
                    that.setState({
                        index: 0,
                    });
                });
        }
    });
    
  }

  componentDidMount() {
      // Interact With Database
      let that = this;
      // Let's add some data to db:
      let points = this.db.collection('points');
      points.insert([{game: 1, participant: 1, tournament: 1, value: 1, id: 1}, {game: 1, participant: 1, tournament: 1, value: 2, id: 2}])
          .then(() => {
              this.db.collection('tournaments').find().toArray((e, tournaments) => {
                  that.setState({ tournament: tournaments[that.state.index], });
              });
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

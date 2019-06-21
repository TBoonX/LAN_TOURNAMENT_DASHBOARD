import React from 'react';
import { Navbar } from 'react-bootstrap';
import Tournament from './Tournament';
import storage from './storage';

class Highscores extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        index: 0,
        tournaments: [],
    };
  }

  componentDidMount() {
      let that = this;
      storage.setObserver('tournament', (e) => {
          console.log('Tournaments changed');
          that.setState({
              tournaments: storage.getList('tournament'),
          });
      });
      that.setState({
          tournaments: storage.getList('tournament'),
      });
      
      let wait = () => {
          setTimeout(() => {
              let amount = this.state.tournaments.length;
              let newIndex = this.state.index + 1;
              if (newIndex >= amount)
                newIndex = 0;
              that.setState({
                  index: newIndex,
              }, wait);
          }, 1000);
      };
      wait();
  }

  render() {
    console.log('parent render', this.state);
    return (
        <div className="App">
            <Navbar bg="light">
                <Navbar.Brand>LAN Tournaments</Navbar.Brand>
            </Navbar>
            <Tournament tournament={this.state.tournaments[this.state.index]} />
        </div>
    );
  }
}

export default Highscores;

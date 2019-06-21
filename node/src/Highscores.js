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
          }, 5000);
      };
      wait();
  }

  render() {
    console.log('parent render', this.state);
    return (
        <div className="App">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <div style={{display: 'inline-block'}}>
                        <img
                            alt=""
                            src="https://tse2.mm.bing.net/th?id=OIP.jm-E6bDf2rrbRu7xJSFYaAAAAA&pid=Api"
                            width="80"
                            height="80"
                            className="d-inline-block align-top"
                        />
                        <h3 className="d-inline-block align-middle" >&nbsp;&nbsp;LAN Tournaments</h3>
                    </div>
                </Navbar.Brand>
            </Navbar>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Tournament tournament={this.state.tournaments[this.state.index]} />
        </div>
    );
  }
}

export default Highscores;

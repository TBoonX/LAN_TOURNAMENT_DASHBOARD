import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import Admin from './Admin';
import Highscores from './Highscores';

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
            <Route path="/admin" component={Admin} />
            <Route exact path="/" component={Highscores} />
        </BrowserRouter>
    );
  }
}

export default App;

import React from 'react';
import { Container, Row, Col, Alert, Form, Button, Dropdown, ButtonToolbar, DropdownButton } from 'react-bootstrap';
import storage from './storage';

const STATE_INIT = {
    tournament: 'Tournament',
    participant: 'Participant',
    game: 'Game',
};

// props:
//    
class Admin extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = STATE_INIT;
    
    this.saveTournament = this.saveTournament.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.saveParticipant = this.saveParticipant.bind(this);
    this.savePoint = this.savePoint.bind(this);
    
    this.tournament_name = {};
    this.game_name = {};
    this.game_image = {};
    this.participant_name = {};
    this.participant_image = {};
    this.point_tournament = {};
    this.point_value = {};
  }

  componentDidUpdate() {
  }
  
  saveTournament(e) {
      // console.log(this.tournament_name, this.tournament_name.value);
      const name = this.tournament_name.value;
      if (name) {
          storage.add('tournament', {name, id: storage.getNewId('tournament')});
          this.tournament_name.value = '';
          this.forceUpdate();
      }
  }
  
  saveGame(e) {
      const name = this.game_name.value;
      const image = this.game_image.value;
      if (name && image) {
          storage.add('game', {name, image, id: storage.getNewId('game')});
          this.game_name.value = '';
          this.game_image.value = '';
          this.forceUpdate();
      }
  }
  
  saveParticipant(e) {
      const name = this.participant_name.value;
      const image = this.participant_image.value;
      if (name && image) {
          storage.add('participant', {name, image, id: storage.getNewId('participant')});
          this.participant_name.value = '';
          this.participant_image.value = '';
          this.forceUpdate();
      }
  }
  
  savePoint(e) {
      console.log(this.state);
      
      const tournament = this.state.tournament,
        game = this.state.game,
        participant = this.state.participant;
      const value = this.point_value.value;
      if (value && tournament !== STATE_INIT.tournament
        && game !== STATE_INIT.game
        && participant !== STATE_INIT.participant) {
            storage.add('point', {
                tournament: storage.getId('tournament', tournament),
                game: storage.getId('game', game),
                participant: storage.getId('participant', participant),
                value,
                id: storage.getNewId('point'),
                time: (new Date()).getTime(),
            });
            this.setState(STATE_INIT);
        }
  }

  render() {
      const tournaments = storage.getList('tournament').map(t => {
          return (
              <Dropdown.Item key={t.id}>{t.name}</Dropdown.Item>
          );
      });
      const games = storage.getList('game').map(t => {
          return (
              <Dropdown.Item key={t.id}>{t.name}</Dropdown.Item>
          );
      });
      const participants = storage.getList('participant').map(t => {
          return (
              <Dropdown.Item key={t.id}>{t.name}</Dropdown.Item>
          );
      });
      const points = storage.getList('point').map(t => {
          return (
              <Dropdown.Item key={t.id}>{storage.getName('participant', t.participant) + ': ' + t.value + ' in ' + storage.getName('tournament', t.tournament) + ' (' + storage.getName('game', t.game) + ')'}</Dropdown.Item>
          );
      });
      
      const tournaments_btn = storage.getList('tournament').map(t => {
          return (
              <Dropdown.Item eventKey={t.name} key={t.id} onSelect={() => {this.setState({tournament: t.name});}} >{t.name}</Dropdown.Item>
          );
      });
      const participants_btn = storage.getList('participant').map(t => {
          return (
              <Dropdown.Item eventKey={t.name} key={t.id} onSelect={() => {this.setState({participant: t.name});}} >{t.name}</Dropdown.Item>
          );
      });
      const games_btn = storage.getList('game').map(t => {
          return (
              <Dropdown.Item eventKey={t.name} key={t.id} onSelect={() => {this.setState({game: t.name});}} >{t.name}</Dropdown.Item>
          );
      });
      
      return (
        <div>
            <h1>Admin Page</h1>
            
            <Container>
                <Row>
                    <Col>
                        <Alert key={1} variant={'secondary'}>
                            Tournaments
                        </Alert>
                        <Dropdown>
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                Vorhandene
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {tournaments}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form>
                            <Form.Group controlId="tournament_name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" ref={input => this.tournament_name = input} />
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={this.saveTournament}>
                                Speichern
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                    <Alert key={1} variant={'secondary'}>
                        Games
                    </Alert>
                    <Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                            Vorhandene
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {games}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form>
                        <Form.Group controlId="game_name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={input => this.game_name = input} />
                        </Form.Group>
                        <Form.Group controlId="game_image">
                            <Form.Label>Bild</Form.Label>
                            <Form.Control type="text" ref={input => this.game_image = input} />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={this.saveGame}>
                            Speichern
                        </Button>
                    </Form>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                    <Alert key={1} variant={'secondary'}>
                        Teilnehmer
                    </Alert>
                    <Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                            Vorhandene
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {participants}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form>
                        <Form.Group controlId="participant_name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={input => this.participant_name = input} />
                        </Form.Group>
                        <Form.Group controlId="participant_image">
                            <Form.Label>Bild</Form.Label>
                            <Form.Control type="text" ref={input => this.participant_image = input} />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={this.saveParticipant}>
                            Speichern
                        </Button>
                    </Form>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                    <Alert key={1} variant={'secondary'}>
                        Punkte
                    </Alert>
                    <Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                            Vorhandene
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {points}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form>
                        <ButtonToolbar>
                            <DropdownButton variant="secondary" title={this.state.tournament} >
                                {tournaments_btn}
                            </DropdownButton>
                             - 
                            <DropdownButton variant="secondary" title={this.state.game} >
                                {games_btn}
                            </DropdownButton>
                             - 
                            <DropdownButton variant="secondary" title={this.state.participant} >
                                {participants_btn}
                            </DropdownButton>
                        </ButtonToolbar>
                        
                        <Form.Group controlId="point_value">
                            <Form.Label>Wert</Form.Label>
                            <Form.Control type="text" ref={input => this.point_value = input} />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={this.savePoint}>
                            Speichern
                        </Button>
                    </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
  }
}

export default Admin;

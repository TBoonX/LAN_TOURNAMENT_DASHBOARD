import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import _ from 'lodash';
import storage from './storage';
import Avatar from './Avatar';

// props:
//    tournament
class Tournament extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  componentDidMount() {
      let that = this;
      storage.setObserver('point', (e) => {
          console.log('Points changed');
          that.forceUpdate();
      });
  }

  render() {
      const tournament = this.props.tournament || {};
      let rows = [];
      let participants = storage.getList('participant');
      let points = storage.getList('point');
      const pointsPerParticipant = participants.reduce((a, c) => {
          const points_ = points.filter(p => (p.participant === c.id && p.tournament === _.get(this.props.tournament, ['id'], 0)));
          a[c.id] = parseInt(points_.reduce((red, current) => {return parseInt(red) + parseInt(current.value)}, 0));
          return a;
      }, {});
      participants = participants.sort((p1, p2) => {
          if (pointsPerParticipant[p1.id] > pointsPerParticipant[p2.id])
            return -1;
          if (pointsPerParticipant[p1.id] < pointsPerParticipant[p2.id])
            return 1;
          return 0;
      });
      participants.forEach(participant => {
          rows.push((
              <tr key={participant.id}>
                <td><Avatar name={participant.name} image={participant.image} /></td>
                <td>{pointsPerParticipant[participant.id]}</td>
              </tr>
          ));
    });
    let games = _.uniq(points.filter((p => (p.tournament === _.get(this.props.tournament, ['id'], 0))))
        .map(p => p.game))
        .map(id => storage.get('game', id))
        .map(game => (
            <Avatar key={game.id} name={game.name} image={game.image} />
        ));
      
    console.log('render', this.props);
    return (
        <Container>
            <Row className="justify-content-md-center">
              <Col md="auto" className="justify-content-md-center">
                <h4>
                    {tournament.name}
                </h4>
                {games}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md="auto">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Teilnehmende Person</th>
                    <th>Punkte</th>
                  </tr>
                </thead>
                <tbody>
                    {
                        rows
                    }
                </tbody>
                </Table>
              </Col>
            </Row>
      </Container>
    );
  }
}

export default Tournament;

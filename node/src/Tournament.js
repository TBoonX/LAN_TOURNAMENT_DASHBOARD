import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import _ from 'lodash';
import storage from './storage';

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
      participants.forEach(participant => {
          rows.push((
              <tr key={participant.id}>
                <td>{participant.name}</td>
                <td>{points.filter(p => (p.participant === participant.id && p.tournament === _.get(this.props.tournament, ['id'], 0))).reduce((red, current) => {return parseInt(red) + parseInt(current.value)}, 0)}</td>
              </tr>
          ));
    });
    let gameNames = _.uniq(points.filter((p => (p.tournament === _.get(this.props.tournament, ['id'], 0))))
        .map(p => p.game))
        .map(id => storage.getName('game', id));
      
    console.log('render', this.props);
    return (
        <Container>
            <Row className="justify-content-md-center">
              <Col md="auto"><h4>{tournament.name} ({gameNames.join(', ')})</h4></Col>
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

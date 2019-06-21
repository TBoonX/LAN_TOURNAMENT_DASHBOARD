import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
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
                <td>{points.filter(p => (p.participant === participant.id && p.tournament === this.props.tournament.id)).reduce((red, current) => {return red + current.value}, 0)}</td>
              </tr>
          ));
      });
      
    console.log('render', this.props);
    return (
        <Container>
            <Row className="justify-content-md-center">
              <Col md="auto">{tournament.name}</Col>
            </Row>
            <Row>
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

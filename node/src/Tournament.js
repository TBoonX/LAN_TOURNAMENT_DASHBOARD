import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

// props:
//    tournament
//    db
class Tournament extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        participants: [],
        game: {},
        points: [],
    };
    this.games = [];
  }

  componentDidUpdate() {
      if (!this.props.db || !this.props.tournament)
        return;
      
      // Interact With Database
      let that = this;
      that.props.db.table('games')
        .toArray()
        .then((games) => {
          that.games = games;
          that.props.db.table('points')
            .where('tournament').equals(that.props.tournament.id)
            .toArray()
            .then((points) => {
                that.props.db.table('participants')
                  .toArray()
                  .then((participants) => {
                    let filteredParticipants = participants.map(p => {
                        if (points.find(point => {
                            return point.participant === p.id;
                        }))
                            return p;
                    });
                    
                    that.setState({
                        participants: filteredParticipants,
                        game: that.games.find(g => (g.id === points[0].game)),
                        points: points,
                    });
                  });
            });
        });
  }

  render() {
      const tournament = this.props.tournament || {};
      let rows = [];
      this.state.participants.forEach(participant => {
          rows.push((
              <tr>
                <td>{participant.name}</td>
                <td>{this.state.points.filter(p => p.participant === participant.id).reduce((red, current) => {return red + current.value}, 0)}</td>
              </tr>
          ));
      });
      
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
                    <th>Teilnehmerin</th>
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

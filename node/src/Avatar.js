import React from 'react';
import { Image } from 'react-bootstrap';

// props:
//    image
//    name
class Avatar extends React.Component {
  render() {
    return (
        <div className="justify-content-md-center">
            <Image fluid src={this.props.image} roundedCircle style={{width: '60px', height: '60px'}} />
            {this.props.name}
        </div>
    );
  }
}

export default Avatar;

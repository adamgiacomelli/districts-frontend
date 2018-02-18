import React from 'react';
const WebSocket = require('ws');

class WebsocketTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 90
    };
  }

  componentWillMount(props) {
    const ws = new WebSocket('ws://localhost:8088/', {
      perMessageDeflate: false
    });

    ws.on('open', function open() {
      ws.send('something');
    });

    ws.on('message', function incoming(data) {
      console.log(data);
    });
  }
  
  render() {
    return (
      <div>
        <div>
          Count: 

        </div>
        <strong>{this.state.count}</strong>
      </div>
    );
  }
}

export default WebsocketTest;
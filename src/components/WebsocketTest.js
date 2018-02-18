import React from 'react';

class WebsocketTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      ws: null,
      msg: "bamboleo"
    };
  }

  componentDidMount(props) {
    let ws = new WebSocket("ws://localhost:8088/echo");
    ws.onopen = function (evt) {
      console.log("OPEN");
    }
    ws.onclose = function (evt) {
      console.log("CLOSE");
      ws = null;
    }
    ws.onmessage = (evt) => {
      console.log("RESPONSE: " + evt.data);
      this.setState({messages: [evt.data, ...this.state.messages]})
    }
    ws.onerror = function (evt) {
      console.log("ERROR: " + evt.data);
    }

    this.setState({ws: ws})
  }

  sendMessage = () => {
    console.log(this.state)
    this.state.ws.send(this.state.msg)
  }
  
  render() {
    return (
      <div>
        <div>
          <input onChange={e=>this.setState({msg: e.target.value})} placeholder="Your message" value={this.state.msg}/>
          <button onClick={this.sendMessage}>Message</button>
          {this.state.messages.map((msg, i) => {
            return <p key={msg+i}>{msg}</p>
          })
          }
        </div>
      </div>
    );
  }
}

export default WebsocketTest;